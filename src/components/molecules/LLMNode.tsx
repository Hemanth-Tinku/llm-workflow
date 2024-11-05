import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';

interface LLMNodeProps {
    id: string;
    data: any;
}

const LLMNode: React.FC<LLMNodeProps> = ({ id, data }) => {
    const [modelName, setModelName] = useState<string>('');
    const [apiKey, setApiKey] = useState<string>('');
    const [temperature, setTemperature] = useState<number>(0.7);

    const handleRunLLM = () => {
        if (!modelName || !apiKey) {
            alert('Model name and API key are required.');
            return;
        }
        
        data.onRun({ model: modelName, apiKey, temperature });
    };

    return (
        <div style={{ width: 220, padding: '10px', border: '1px solid #ddd', borderRadius: '5px', background: '#f5f5f5' }}>
            <div>
                <strong>LLM Node</strong>
            </div>
            <div>
                <label>
                    Model Name:
                    <input
                        type="text"
                        value={modelName}
                        onChange={(e) => setModelName(e.target.value)}
                        placeholder="Enter model name"
                        style={{ width: '100%', marginBottom: '5px' }}
                    />
                </label>
            </div>
            <div>
                <label>
                    OpenAI API Key:
                    <input
                        type="text"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Enter API Key"
                        style={{ width: '100%', marginBottom: '5px' }}
                    />
                </label>
            </div>
            <div>
                <label>
                    Temperature:
                    <input
                        type="number"
                        value={temperature}
                        onChange={(e) => setTemperature(Number(e.target.value))}
                        placeholder="Enter temperature"
                        style={{ width: '100%', marginBottom: '5px' }}
                        min={0}
                        max={1}
                        step={0.1}
                    />
                </label>
            </div>
            <button onClick={handleRunLLM} style={{ marginTop: '5px', width: '100%' }}>
                Run LLM
            </button>
            <Handle
                type="target"
                position={Position.Left}
                id={`${id}-input`}
            />
            <Handle
                type="source"
                position={Position.Right}
                id={`${id}-output`}
            />
        </div>
    );
};

export default LLMNode;
