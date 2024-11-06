import { Handle, Position } from 'reactflow';

interface LLMNodeProps {
    id: string;
    data: {
        id: string;
        modelName: string;
        apiKey: string;
        base: string;
        maxTokens: number;
        temperature: number;
        errors: {
            modelName?: string;
            apiKey?: string;
            base?: string;
        };
        dispatch: any;
    };
}

const LLMNode: React.FC<LLMNodeProps> = ({ id, data }) => {
    const { id: nodeID, modelName, base, apiKey,
        maxTokens,
        temperature, errors, dispatch } = data;

    const onChangeField = (key: string, value: string | number) => {
        dispatch({
            type: 'UPDATE_NODE_FIELD', payload: {
                nodeId: nodeID, fieldName: key, fieldValue: value
            }
        });
    }

    return (
        <div style={{ width: 260, padding: 10, border: '1px solid #ddd', borderRadius: 5, background: '#f9f9f9' }}>
            <strong style={{ display: 'block', marginBottom: 8 }}>LLM Node</strong>

            <div style={{ marginBottom: 8 }}>
                <label style={{ fontSize: 13 }}>Model Name:</label>
                <input
                    type="text"
                    value={modelName}
                    onChange={(e) => onChangeField('modelName', e.target.value)}
                    placeholder="e.g., gpt-3.5"
                    style={{ width: '100%', marginBottom: 4, padding: 4 }}
                />
                {errors.modelName && <span style={{ color: 'red', fontSize: 12 }}>{errors.modelName}</span>}
            </div>

            <div style={{ marginBottom: 8 }}>
                <label style={{ fontSize: 13 }}>OpenAI Base:</label>
                <input
                    type="text"
                    value={base}
                    onChange={(e) => onChangeField('base', e.target.value)}
                    placeholder="e.g., https://api.openai.com"
                    style={{ width: '100%', marginBottom: 4, padding: 4 }}
                />
                {errors.base && <span style={{ color: 'red', fontSize: 12 }}>{errors.base}</span>}
            </div>

            <div style={{ marginBottom: 8 }}>
                <label style={{ fontSize: 13 }}>OpenAI API Key:</label>
                <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => onChangeField('apiKey', e.target.value)}
                    placeholder="Enter API Key"
                    style={{ width: '100%', marginBottom: 4, padding: 4 }}
                />
                {errors.apiKey && <span style={{ color: 'red', fontSize: 12 }}>{errors.apiKey}</span>}
            </div>

            <div style={{ marginBottom: 8 }}>
                <label style={{ fontSize: 13 }}>Max Tokens:</label>
                <input
                    type="number"
                    value={maxTokens}
                    onChange={(e) => onChangeField('maxTokens', Number(e.target.value))}
                    min={1}
                    max={4096}
                    placeholder="e.g., 100"
                    style={{ width: '100%', marginBottom: 4, padding: 4 }}
                />
            </div>

            <div style={{ marginBottom: 8 }}>
                <label style={{ fontSize: 13 }}>
                    Temperature: <strong>{temperature}</strong>
                </label>
                <input
                    type="range"
                    value={temperature}
                    onChange={(e) => onChangeField('temperature', Number(e.target.value))}
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
