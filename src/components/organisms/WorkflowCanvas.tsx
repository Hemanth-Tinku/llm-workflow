import React, { createContext, useCallback, useContext, useReducer, useRef, useState } from 'react';
import ReactFlow, { Controls, Background, MiniMap, Node, ReactFlowInstance, NodeChange, EdgeChange, Connection } from 'reactflow';
import 'reactflow/dist/style.css';
import Navbar from './Navbar';
import { workflowReducer, initialState } from '../../reducers/workflowReducer';
import InputNode from '../molecules/InputNode';
import LLMNode from '../molecules/LLMNode';
import OutputNode from '../molecules/OutputNode';

interface NodeData {
    id: string;
    nodeType: string;
}

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
                dispatch({ type: 'CONNECT', payload: connection });
            } else {
                setError("Invalid connection! InputNode should connect to LLMNode, and LLMNode should connect to OutputNode.");
            }
        }
    };

    const onAddNode = (node: Node) => {
        dispatch({ type: 'ADD_NODE', payload: node });
    };

    const getInitNodeData = (nodeID: string, type: string): NodeData => {
        return { id: nodeID, nodeType: type };
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

    const runWorkflow = async () => {
        setError(null);
        setIsRunning(true);

        try {
            for (const node of state.nodes) {
                if (node.type === 'llmNode' && (!node.data.apiKey || !node.data.modelName)) {
                    throw new Error(`Configuration missing in LLM node with ID: ${node.id}`);
                }
            }

            for (const node of state.nodes) {
                if (node.type === 'llmNode') {
                    await node.data.onRun({
                        model: node.data.modelName,
                        apiKey: node.data.apiKey,
                        temperature: node.data.temperature,
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
