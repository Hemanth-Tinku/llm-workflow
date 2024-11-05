import React, { createContext, useCallback, useContext, useReducer, useRef, useState } from 'react';
import ReactFlow, { Controls, Background, MiniMap, Node, ReactFlowInstance, NodeChange, EdgeChange, Connection } from 'reactflow';
import 'reactflow/dist/style.css';
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
    const reactFlowContainer = useRef<HTMLDivElement>(null);

    const onNodesChange = (changes: NodeChange[]) => {
        dispatch({ type: 'NODES_CHANGE', payload: changes });
    }

    const onEdgesChange = (changes: EdgeChange[]) => {
        dispatch({ type: 'EDGES_CHANGE', payload: changes });
    }

    const onConnect = (connection: Connection) => {
        dispatch({ type: 'CONNECT', payload: connection });
    }

    const onAddNode = (node: Node) => {
        dispatch({ type: 'ADD_NODE', payload: node })
    }

    const getInitNodeData = (nodeID: string, type: string): NodeData => {
        return { id: nodeID, nodeType: type };
    };

    const getNodeID = (type: string): string => {
        dispatch({ type: 'UPDATE_NODE_ID', payload: type });
        let nodeID = 0;
        if (state.nodeIDs?.[type] !== undefined) {
            nodeID = state.nodeIDs?.[type] + 1;
        }
        return String(nodeID);
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

                let nodeID = getNodeID(type)
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

    return (
        <div style={{ flex: 1, height: '100vh' }}>
            <h1 style={{ textAlign: 'center' }}>LLM Workflow</h1>
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
        </div>
    );
};

export default WorkflowCanvas;
