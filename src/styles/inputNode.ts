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
    titleContainer: {
        marginBottom: 12,
    },
    nodeTitle: {
        fontSize: 16,
        fontWeight: 600,
        color: '#333',
    },
    inputContainer: {
        marginBottom: 12,
        width: '100%',
    },
    inputLabel: {
        fontSize: 13,
        color: '#555',
        marginBottom: 4,
    },
    inputField: {
        width: '100%',
        padding: '8px',
        fontSize: 14,
        borderRadius: 4,
        border: '1px solid #ccc',
        background: '#fff',
        marginBottom: 4,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
    },
    handle: {
        backgroundColor: '#fff',
        border: '2px solid #ccc',
        borderRadius: '50%',
        width: 12,
        height: 12,
        boxShadow: '0 0 4px rgba(0, 0, 0, 0.2)',
    }
}
