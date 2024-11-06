import { Handle, Position } from 'reactflow';
import { styles } from '../../styles/llmNode';

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
    const { id: nodeID, modelName, base, apiKey, maxTokens, temperature, errors, dispatch } = data;

    const onChangeField = (key: string, value: string | number) => {
        dispatch({
            type: 'UPDATE_NODE_FIELD', payload: {
                nodeId: nodeID, fieldName: key, fieldValue: value
            }
        });
    }

    return (
        <div style={styles.nodeContainer}>
            <strong style={styles.nodeTitle}>LLM Node</strong>

            <div style={styles.inputContainer}>
                <label style={styles.label}>Model Name:</label>
                <input
                    type="text"
                    value={modelName}
                    onChange={(e) => onChangeField('modelName', e.target.value)}
                    placeholder="e.g., gpt-3.5"
                    style={styles.input}
                />
                {errors.modelName && <span style={styles.errorText}>{errors.modelName}</span>}
            </div>

            <div style={styles.inputContainer}>
                <label style={styles.label}>OpenAI Base:</label>
                <input
                    type="text"
                    value={base}
                    onChange={(e) => onChangeField('base', e.target.value)}
                    placeholder="e.g., https://api.openai.com"
                    style={styles.input}
                />
                {errors.base && <span style={styles.errorText}>{errors.base}</span>}
            </div>

            <div style={styles.inputContainer}>
                <label style={styles.label}>OpenAI API Key:</label>
                <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => onChangeField('apiKey', e.target.value)}
                    placeholder="Enter API Key"
                    style={styles.input}
                />
                {errors.apiKey && <span style={styles.errorText}>{errors.apiKey}</span>}
            </div>

            <div style={styles.inputContainer}>
                <label style={styles.label}>Max Tokens:</label>
                <input
                    type="number"
                    value={maxTokens}
                    onChange={(e) => onChangeField('maxTokens', Number(e.target.value))}
                    min={1}
                    max={4096}
                    placeholder="e.g., 100"
                    style={styles.input}
                />
            </div>

            <div style={styles.inputContainer}>
                <label style={styles.label}>
                    Temperature: <strong>{temperature}</strong>
                </label>
                <input
                    type="range"
                    value={temperature}
                    onChange={(e) => onChangeField('temperature', Number(e.target.value))}
                    min={0}
                    max={1}
                    step={0.1}
                    style={styles.rangeInput}
                />
            </div>

            <Handle type="target" position={Position.Left} id={`${id}-input`} style={styles.handle} />
            <Handle type="source" position={Position.Right} id={`${id}-output`} style={styles.handle} />
        </div>
    );
};



export default LLMNode;
