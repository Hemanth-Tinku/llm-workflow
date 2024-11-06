export const styles: { [key: string]: React.CSSProperties } = {
    nodeContainer: {
        width: 220,
        padding: '16px 20px',
        borderRadius: 8,
        background: '#f5f5f5',
        border: '1px solid #ddd',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        fontFamily: 'Arial, sans-serif',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    handle: {
        backgroundColor: '#fff',
        border: '2px solid #ccc',
        borderRadius: '50%',
        width: 12,
        height: 12,
        boxShadow: '0 0 4px rgba(0, 0, 0, 0.2)',
    },
    titleContainer: {
        marginBottom: 12,
    },
    nodeTitle: {
        fontSize: 16,
        fontWeight: 600,
        color: '#333',
    },
    outputContainer: {
        marginTop: 8,
        width: '100%',
    },
    outputLabel: {
        fontSize: 14,
        color: '#555',
        marginBottom: 6,
    },
    outputValue: {
        fontSize: 14,
        color: '#333',
        backgroundColor: '#e9ecef',
        padding: '8px',
        borderRadius: 6,
        wordWrap: 'break-word',
        whiteSpace: 'pre-wrap',
    },
};