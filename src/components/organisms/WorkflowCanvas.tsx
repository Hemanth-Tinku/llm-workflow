import ReactFlow, { Controls, Background, MiniMap, useEdgesState, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';
import InputNode from '../molecules/InputNode';
import OutputNode from '../molecules/OutputNode';
import LLMNode from '../molecules/LLMNode';

const gridSize = 20;

const nodeTypes = {
    inputNode: InputNode,
    llmNode: LLMNode,
    outputNode: OutputNode
}

const initialNode = [
    {
        id: 'node-0',
        type: 'inputNode',
        position: { x: 100, y: 100 },
        data: {}
    },
    {
        id: 'node-1',
        type: 'llmNode',
        position: { x: 300, y: 100 },
        data: {}
    },
    {
        id: 'node-2',
        type: 'outputNode',
        position: { x: 500, y: 100 },
        data: {}
    }
]

const WorkflowCanvas: React.FC = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNode);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    return (
        <>
            <div style={{ width: '100wv', height: '100vh' }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    nodeTypes={nodeTypes}
                >
                    <Background color="#aaa" gap={gridSize} />
                    <Controls />
                    <MiniMap />
                </ReactFlow>
            </div>
        </>
    )
}

export default WorkflowCanvas;
