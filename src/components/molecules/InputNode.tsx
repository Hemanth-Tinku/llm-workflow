import React from 'react';
import { Handle, Position } from 'reactflow';
import { styles } from '../../styles/inputNode';


interface InputNodeProps {
    id: string;
    data: {
        id: string;
        inputValue: string;
        errors: {
            inputValue?: string;
        };
        dispatch: any;
    };
}

const InputNode: React.FC<InputNodeProps> = ({ id, data }) => {
    const { id: nodeID, inputValue, dispatch, errors } = data;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        dispatch({
            type: 'UPDATE_NODE_FIELD', payload: {
                nodeId: nodeID, fieldName: 'inputValue', fieldValue: value
            }
        });
    };

    return (
        <div style={styles.nodeContainer}>
            <div style={styles.titleContainer}>
                <strong style={styles.nodeTitle}>Input</strong>
            </div>
            <div style={styles.inputContainer}>
                <label style={styles.inputLabel}>Input:</label>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter your query"
                    style={styles.inputField}
                />
                {errors?.inputValue && <span style={styles.errorText}>{errors.inputValue}</span>}
            </div>
            <Handle
                type="source"
                position={Position.Right}
                id={`${id}-llm`}
                style={styles.handle}
            />
        </div>
    );
};

export default InputNode;
