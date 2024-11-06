import { Handle, Position } from 'reactflow';

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
        <div style={{ width: 220, padding: '10px', border: '1px solid #ddd', borderRadius: '5px', background: '#f5f5f5' }}>
            <div>
                <strong>Input</strong>
            </div>
            <div style={{ marginBottom: 8 }}>
                <label style={{ fontSize: 13 }}>Input:</label>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter your query"
                    style={{ width: '100%', marginBottom: '5px' }}
                />
                {errors?.inputValue && <span style={{ color: 'red', fontSize: 12 }}>{errors.inputValue}</span>}
            </div>
            <Handle type="source" position={Position.Right} id={`${id}-llm`} />
        </div>
    );
};

export default InputNode;
