import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';

interface LLMNodeProps {
    id: string;
    data: {
        onRun: (config: { model: string; apiKey: string; temperature: number }) => void;
    };
}

const LLMNode: React.FC<LLMNodeProps> = ({ id, data }) => {
    const [modelName, setModelName] = useState<string>('');
    const [apiKey, setApiKey] = useState<string>('');
    const [temperature, setTemperature] = useState<number>(0.7);
    const [errors, setErrors] = useState<{ model?: string; apiKey?: string }>({});

    const handleRunLLM = () => {
        const validationErrors: { model?: string; apiKey?: string } = {};

        // Validate that required fields are not empty
        if (!modelName) validationErrors.model = 'Model name is required.';
        if (!apiKey) validationErrors.apiKey = 'API key is required.';

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        data.onRun({ model: modelName, apiKey, temperature });
    };

    return (
        <div style={{ width: 250, padding: '10px', border: '1px solid #ddd', borderRadius: '5px', background: '#f5f5f5' }}>
            <div>
                <strong>LLM Node</strong>
            </div>
            <div style={{ marginBottom: '5px' }}>
                <label>
                    Model Name:
                    <input
                        type="text"
                        value={modelName}
                        onChange={(e) => setModelName(e.target.value)}
                        placeholder="e.g., gpt-3.5"
                        style={{ width: '100%', marginBottom: '5px' }}
                    />
                </label>
                {errors.model && <span style={{ color: 'red', fontSize: '12px' }}>{errors.model}</span>}
            </div>
            <div style={{ marginBottom: '5px' }}>
                <label>
                    OpenAI API Key:
                    <input
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Enter API Key"
                        style={{ width: '100%', marginBottom: '5px' }}
                    />
                </label>
                {errors.apiKey && <span style={{ color: 'red', fontSize: '12px' }}>{errors.apiKey}</span>}
            </div>
            <div style={{ marginBottom: '5px' }}>
                <label>
                    Temperature (0 to 1):
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
            <button onClick={handleRunLLM} style={{ marginTop: '10px', width: '100%' }}>
                Run LLM
            </button>
            <Handle type="target" position={Position.Left} id={`${id}-input`} />
            <Handle type="source" position={Position.Right} id={`${id}-output`} />
        </div>
    );
};

export default LLMNode;
