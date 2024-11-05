
import WorkflowCanvas from './components/organisms/WorkflowCanvas';
import Toolbar from './components/organisms/ToolBar';

function App() {
  return (
    <div style={{display:'flex', height: '100vh'}}>
      <Toolbar />
      <WorkflowCanvas />
    </div>
  );
}

export default App;
