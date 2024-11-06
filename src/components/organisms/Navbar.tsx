import { styles } from "../../styles/navbar";

interface NavbarProps {
    title: string;
    onRunWorkflow: () => void;
    isRunning: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ title, onRunWorkflow, isRunning }) => {
    return (
        <nav style={styles.navbarContainer}>
            <h1 style={styles.title}>{title}</h1>
            <button
                onClick={onRunWorkflow}
                disabled={isRunning}
                style={{
                    ...styles.button,
                    ...(isRunning ? styles.buttonDisabled : {}),
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = (isRunning ? styles.buttonDisabled.backgroundColor : styles.button.backgroundColor)}
            >
                {isRunning ? 'Running...' : 'Run Workflow'}
            </button>
        </nav>
    );
};

export default Navbar;
