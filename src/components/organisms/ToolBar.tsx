import React from 'react';
import DraggableNode from '../molecules/DraggableNode';

const Toolbar: React.FC = () => {
    const styles: { [key: string]: React.CSSProperties } = {
        toolbarContainer: {
            width: '250px',
            height: '100vh',
            padding: '10px',
            background: '#f0f0f0',
            borderRight: '1px solid #ddd',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
        },
        title: {
            marginBottom: '20px',
            fontSize: '18px',
            fontWeight: 'bold',
        },
        nodeList: {
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
        }
    };

    return (
        <div style={styles.toolbarContainer}>
            <h2 style={styles.title}>Nodes</h2>
            <div style={styles.nodeList}>
                <DraggableNode type='inputNode' label='Input' />
                <DraggableNode type='llmNode' label='LLM' />
                <DraggableNode type='outputNode' label='Output' />
            </div>
        </div>
    );
};

export default Toolbar;
