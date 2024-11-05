import React from 'react';

interface DraggableNodeProps {
    type: string;
    label: string;
}

const DraggableNode: React.FC<DraggableNodeProps> = ({ type, label }) => {
    const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
        const appData = { nodeType };
        event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div
            className={type}
            onDragStart={(event) => onDragStart(event, type)}
            style={{
                cursor: 'grab',
                minWidth: '100px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '8px',
                backgroundColor: '#1C2536',
                justifyContent: 'center',
                flexDirection: 'column',
                color: '#fff',
                padding: '5px',
                margin: '5px 0'
            }}
            draggable
        >
            <span style={{ fontWeight: 'bold' }}>{label}</span>
        </div>
    );
};

export default DraggableNode;