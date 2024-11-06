export const styles = {
    navbarContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#282c34',
        color: 'white',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    title: {
        fontSize: 24,
        fontWeight: 600,
        margin: 0,
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#61dafb',
        border: 'none',
        borderRadius: '4px',
        color: '#282c34',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    buttonDisabled: {
        backgroundColor: '#b0b0b0',
        cursor: 'not-allowed',
    },
    buttonHover: {
        backgroundColor: '#21a1f1',
    },
};