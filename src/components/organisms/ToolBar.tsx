import DraggableNode from '../molecules/DraggableNode';

const Toolbar: React.FC = () => {
    return (
        <div style={{
            width: '250px',
            height: '100vh',
            padding: '10px',
            background: '#f0f0f0',
            borderRight: '1px solid #ddd',
            display: 'flex',
            flexDirection: 'column',
            position: 'fixed',
            top: 0,
            left: 0,
            overflowY: 'auto'
        }}>
            <h2 style={{ marginBottom: '20px' }}>Nodes</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <DraggableNode type='input' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='output' label='Output' />
            </div>
        </div>
    );
};

export default Toolbar;