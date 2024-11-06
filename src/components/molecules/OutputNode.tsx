import React from 'react';
import { Handle, Position } from 'reactflow';

interface OutputNodeProps {
    id: string;
    data: any;
}

const OutputNode: React.FC<OutputNodeProps> = ({ id, data }) => {

    return (
        <div style={{ width: 220, padding: '10px', border: '1px solid #ddd', borderRadius: '5px', background: '#f5f5f5' }}>
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-llm`}
            />
            <div>
                <strong>Output</strong>
            </div>
            {data.outputValue && (
                <div>
                    <strong>Output Response:</strong>
                    <p>{data.outputValue}</p>
                </div>
            )}
        </div>
    );
};

export default OutputNode;
