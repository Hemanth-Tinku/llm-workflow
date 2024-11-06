interface NavbarProps {
    title: string;
    onRunWorkflow: () => void;
    isRunning: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ title, onRunWorkflow, isRunning }) => {
    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#282c34', color: 'white' }}>
            <h1>{title}</h1>
            <button onClick={onRunWorkflow} disabled={isRunning} style={{ padding: '10px 20px', fontSize: '16px' }}>
                {isRunning ? 'Running...' : 'Run Workflow'}
            </button>
        </nav>
    );
};

export default Navbar;
