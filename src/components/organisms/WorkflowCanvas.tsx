import React, { createContext, useCallback, useContext, useReducer, useRef, useState } from 'react';
import ReactFlow, { Controls, Background, MiniMap, Node, ReactFlowInstance, NodeChange, EdgeChange, Connection } from 'reactflow';
import 'reactflow/dist/style.css';
import Navbar from './Navbar';
import { workflowReducer, initialState } from '../../reducers/workflowReducer';
import InputNode from '../molecules/InputNode';
import LLMNode from '../molecules/LLMNode';
import OutputNode from '../molecules/OutputNode';

interface BaseNodeData {
    id: string;
    nodeType: string;
    dispatch: any;
}

interface InputNodeData extends BaseNodeData {
    inputValue: string;
    error: string;
}

interface LLMNodeData extends BaseNodeData {
    modelName: string;
    apiKey: string;
    base: string;
    maxTokens: number;
    temperature: number;
    errors: {
        model?: string;
        apiKey?: string;
        base?: string;
    };
}

interface OutputNodeData extends BaseNodeData {
    outputValue: string;
}

type NodeData = InputNodeData | LLMNodeData | OutputNodeData;

const WorkflowContext = createContext<any>(null);

export const useWorkflow = () => useContext(WorkflowContext);

const gridSize = 20;

const nodeTypes = {
    inputNode: InputNode,
    llmNode: LLMNode,
    outputNode: OutputNode,
};

const WorkflowCanvas: React.FC = () => {
    const [state, dispatch] = useReducer(workflowReducer, initialState);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isRunning, setIsRunning] = useState(false);
    const reactFlowContainer = useRef<HTMLDivElement>(null);

    const onNodesChange = (changes: NodeChange[]) => {
        dispatch({ type: 'NODES_CHANGE', payload: changes });
    };

    const onEdgesChange = (changes: EdgeChange[]) => {
        dispatch({ type: 'EDGES_CHANGE', payload: changes });
    };

    const onConnect = (connection: Connection) => {
        const { source, target } = connection;
        const sourceNode = state.nodes.find((node) => node.id === source);
        const targetNode = state.nodes.find((node) => node.id === target);

        if (sourceNode && targetNode) {
            if ((sourceNode.type === 'inputNode' && targetNode.type === 'llmNode') ||
                (sourceNode.type === 'llmNode' && targetNode.type === 'outputNode')) {
                const llmNodeId = sourceNode.type === 'llmNode' ? sourceNode.id : targetNode.id;
                const connectedNode = sourceNode.type === 'llmNode' ? targetNode : sourceNode
                dispatch({ type: 'CONNECT', payload: { connection: connection, llmNodeId: llmNodeId, connectedNode: connectedNode } });
            } else {
                setError("Invalid connection! InputNode should connect to LLMNode, and LLMNode should connect to OutputNode.");
            }
        }
    };

    const onAddNode = (node: Node) => {
        dispatch({ type: 'ADD_NODE', payload: node });
    };

    const getInitNodeData = (nodeID: string, type: string): NodeData => {
        if (type === 'llmNode') {
            return {
                id: nodeID,
                nodeType: type,
                modelName: '',
                apiKey: '',
                base: 'https://api.openai.com/v1/completions',
                maxTokens: 100,
                temperature: 0.5,
                errors: {},
                dispatch
            }
        }
        else if (type === 'inputNode') {
            return {
                id: nodeID,
                nodeType: type,
                inputValue: '',
                error: '',
                dispatch
            }
        }
        return { id: nodeID, nodeType: type, dispatch, outputValue: '' };
    };

    const onDrop = useCallback(
        (event: React.DragEvent<HTMLDivElement>): void => {
            event.preventDefault();

            const reactFlowBounds = reactFlowContainer.current?.getBoundingClientRect();
            const appData = event.dataTransfer.getData('application/reactflow');
            if (appData && reactFlowInstance && reactFlowBounds) {
                const { nodeType: type } = JSON.parse(appData);

                if (!type) return;

                const position = reactFlowInstance.project({
                    x: event.clientX - reactFlowBounds.left,
                    y: event.clientY - reactFlowBounds.top,
                });

                let nodeID = new Date().getTime().toString();
                const newNode: Node = {
                    id: nodeID,
                    type,
                    position,
                    data: getInitNodeData(nodeID, type),
                };

                onAddNode(newNode);
            }
        },
        [reactFlowInstance]
    );

    const onDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    const onInit = (instance: ReactFlowInstance): void => {
        setReactFlowInstance(instance);
    };

    const getLLMResponse = async ({ modelName, apiKey, temperature, input, maxTokens, base }: any) => {
        try {
            const response = await fetch(base, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: modelName,
                    prompt: input,
                    max_tokens: maxTokens,
                    temperature: temperature,
                }),
            });

            if (!response.ok) {
                alert(`OpenAI API call failed: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data.choices[0]?.text || 'No response from API';
        } catch (error: any) {
            throw new Error(`Error calling OpenAI API: ${error.message}`);
        }
    };

    const runWorkflow = async () => {
        setError(null);
        setIsRunning(true);

        try {
            for (const node of state.nodes) {
                if (node.type === 'inputNode' && !node.data?.inputValue) {
                    dispatch({ type: 'SET_FIELD_ERROR', payload: { nodeId: node.id, fieldName: 'inputValue', errorMessage: 'Input is required.' } });
                    throw new Error(`Empty Input node with ID: ${node.id}`);
                }
                else if (node.type === 'inputNode' && Object.keys(node.data?.errors)?.length) {
                    dispatch({ type: 'RESET_FIELD_ERROR', payload: { nodeId: node.id, fieldName: 'inputValue' } });
                }
                if (node.type === 'llmNode') {
                    let hasError = false;
                    if (!node.data.modelName) {
                        dispatch({ type: 'SET_FIELD_ERROR', payload: { nodeId: node.id, fieldName: 'modelName', errorMessage: 'Model name is required.' } })
                        hasError = true;
                    }
                    else {
                        dispatch({ type: 'RESET_FIELD_ERROR', payload: { nodeId: node.id, fieldName: 'modelName' } });
                    }
                    if (!node.data.apiKey) {
                        dispatch({ type: 'SET_FIELD_ERROR', payload: { nodeId: node.id, fieldName: 'apiKey', errorMessage: 'API key is required.' } })
                        hasError = true;
                    }
                    else {
                        dispatch({ type: 'RESET_FIELD_ERROR', payload: { nodeId: node.id, fieldName: 'apiKey' } });
                    }
                    if (!node.data.base) {
                        dispatch({ type: 'SET_FIELD_ERROR', payload: { nodeId: node.id, fieldName: 'base', errorMessage: 'Base URL is required.' } })
                        hasError = true;
                    }
                    else {
                        dispatch({ type: 'RESET_FIELD_ERROR', payload: { nodeId: node.id, fieldName: 'base' } });
                    }
                    if (hasError) {
                        throw new Error(`Configuration missing in LLM node with ID: ${node.id}`);
                    }

                }
            }


            for (const node of state.nodes) {

                if (node.type === 'llmNode') {
                    const { modelName, apiKey, temperature, maxTokens, base } = node.data;

                    const input = state.nodes.find(n => n.id === node.data.inputNodeId)?.data.inputValue || '';

                    //  OpenAI API for this LLM Node
                    const result = await getLLMResponse({ modelName, apiKey, temperature, input, maxTokens, base });

                    const outputNodeId = state.nodes.find(n => n.id === node.data.outputNodeId)?.id || '';
                    dispatch({
                        type: 'UPDATE_NODE_FIELD', payload: {
                            nodeId: outputNodeId, fieldName: 'outputValue', fieldValue: result
                        }
                    });
                }
            }

            alert('Workflow execution successful!');
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred during workflow execution.');
        } finally {
            setIsRunning(false);
        }
    };

    return (
        <div style={{ flex: 1, height: '100vh' }}>
            <Navbar title="LLM Workflow" onRunWorkflow={runWorkflow} isRunning={isRunning} />
            <div ref={reactFlowContainer} style={{ height: '100%' }}>
                <ReactFlow
                    nodes={state.nodes}
                    edges={state.edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onInit={onInit}
                    nodeTypes={nodeTypes}
                    snapGrid={[gridSize, gridSize]}
                >
                    <Background color="#aaa" gap={gridSize} />
                    <Controls />
                    <MiniMap />
                </ReactFlow>
            </div>
            <div style={{ textAlign: 'center', padding: '10px' }}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    );
};

export default WorkflowCanvas;
