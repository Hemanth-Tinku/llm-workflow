
import WorkflowCanvas from './components/organisms/WorkflowCanvas';
import Toolbar from './components/organisms/ToolBar';

function App() {
  return (
    <div style={{display:'flex',flex: 1, height: '100vh', width: '100vw'}}>
      <Toolbar />
      <WorkflowCanvas />
    </div>
  );
}

export default App;
