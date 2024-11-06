import React, { useEffect, useState } from 'react';
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

    const validateInputs = () => {
        const validationErrors: { model?: string; apiKey?: string } = {};
        if (!modelName) validationErrors.model = 'Model name is required.';
        if (!apiKey) validationErrors.apiKey = 'API key is required.';
        return validationErrors;
    };

    useEffect(() => {
        const validationErrors = validateInputs();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            data.onRun({ model: modelName, apiKey, temperature });
        }
    }, [modelName, apiKey, temperature, data]);

    return (
        <div style={{ width: 260, padding: 10, border: '1px solid #ddd', borderRadius: 5, background: '#f9f9f9' }}>
            <strong style={{ display: 'block', marginBottom: 8 }}>LLM Node</strong>

            <div style={{ marginBottom: 8 }}>
                <label style={{ fontSize: 13 }}>Model Name:</label>
                <input
                    type="text"
                    value={modelName}
                    onChange={(e) => setModelName(e.target.value)}
                    placeholder="e.g., gpt-3.5"
                    style={{ width: '100%', marginBottom: 4, padding: 4 }}
                />
                {errors.model && <span style={{ color: 'red', fontSize: 12 }}>{errors.model}</span>}
            </div>

            <div style={{ marginBottom: 8 }}>
                <label style={{ fontSize: 13 }}>OpenAI API Key:</label>
                <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter API Key"
                    style={{ width: '100%', marginBottom: 4, padding: 4 }}
                />
                {errors.apiKey && <span style={{ color: 'red', fontSize: 12 }}>{errors.apiKey}</span>}
            </div>

            <div style={{ marginBottom: 8 }}>
                <label style={{ fontSize: 13 }}>
                    Temperature: <strong>{temperature}</strong>
                </label>
                <input
                    type="range"
                    value={temperature}
                    onChange={(e) => setTemperature(Number(e.target.value))}
                    min={0}
                    max={1}
                    step={0.1}
                    style={{ width: '100%' }}
                />
            </div>

            <Handle type="target" position={Position.Left} id={`${id}-input`} />
            <Handle type="source" position={Position.Right} id={`${id}-output`} />
        </div>
    );
};

export default LLMNode;
