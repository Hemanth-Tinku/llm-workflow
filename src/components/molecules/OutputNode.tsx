import React from 'react';
import { Handle, Position } from 'reactflow';
import { styles } from '../../styles/outputNode';

interface OutputNodeProps {
    id: string;
    data: {
        outputValue: string;
    };
}

const OutputNode: React.FC<OutputNodeProps> = ({ id, data }) => {
    return (
        <div style={styles.nodeContainer}>
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-llm`}
                style={styles.handle}
            />
            <div style={styles.titleContainer}>
                <strong style={styles.nodeTitle}>Output</strong>
            </div>
            {data.outputValue && (
                <div style={styles.outputContainer}>
                    <strong style={styles.outputLabel}>Output Response:</strong>
                    <p style={styles.outputValue}>{data.outputValue}</p>
                </div>
            )}
        </div>
    );
};


export default OutputNode;
