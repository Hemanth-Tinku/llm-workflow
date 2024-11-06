import { useState } from 'react';
import { Handle, Position } from 'reactflow';

interface InputNodeProps {
    id: string;
    data: any;
}

const InputNode: React.FC<InputNodeProps> = ({ id, data }) => {
    const [inputValue, setInputValue] = useState<string>("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
    };

    return (
        <div style={{ width: 220, padding: '10px', border: '1px solid #ddd', borderRadius: '5px', background: '#f5f5f5' }}>
            <div>
                <strong>Input</strong>
            </div>
            <div>
                <label>
                    Query:
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Enter your query"
                        style={{ width: '100%', marginBottom: '5px' }}
                    />
                </label>
            </div>
            <Handle type="source" position={Position.Right} id={`${id}-llm`} />
        </div>
    );
};

export default InputNode;
