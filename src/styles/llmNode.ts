export const styles: { [key: string]: React.CSSProperties } = {
    nodeContainer: {
        width: 280,
        padding: '16px 24px',
        borderRadius: 12,
        background: '#f0f4f8',
        border: '1px solid #e0e0e0',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        fontFamily: 'Arial, sans-serif',
    },
    nodeTitle: {
        fontSize: 16,
        fontWeight: 600,
        marginBottom: 12,
        color: '#333',
    },
    inputContainer: {
        marginBottom: 12,
        width: '100%',
    },
    label: {
        fontSize: 14,
        color: '#555',
        marginBottom: 4,
    },
    input: {
        width: '100%',
        padding: '8px',
        borderRadius: 6,
        border: '1px solid #ccc',
        fontSize: 14,
        color: '#333',
        outline: 'none',
        transition: 'border-color 0.3s ease',
    },
    rangeInput: {
        width: '100%',
        marginTop: 8,
        cursor: 'pointer',
    },
    errorText: {
        fontSize: 12,
        color: 'red',
        marginTop: 4,
    },
    handle: {
        backgroundColor: '#fff',
        border: '2px solid #ccc',
        borderRadius: '50%',
        width: 12,
        height: 12,
        boxShadow: '0 0 4px rgba(0, 0, 0, 0.2)',
    },
};
