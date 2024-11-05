import {
    Edge,
    Node,
    MarkerType,
    EdgeChange,
    NodeChange,
    Connection,
    applyEdgeChanges,
    applyNodeChanges,
    addEdge,
  } from 'reactflow';
  
  interface WorkflowState {
    nodes: Node[];
    edges: Edge[];
    nodeIDs: Record<string, number>;
  }
  
  const initialState: WorkflowState = {
    nodes: [],
    edges: [],
    nodeIDs: {},
  };
  
  // Action Types
  type Action =
    | { type: 'UPDATE_NODE_ID'; payload: string }
    | { type: 'ADD_NODE'; payload: Node }
    | { type: 'NODES_CHANGE'; payload: NodeChange[] }
    | { type: 'EDGES_CHANGE'; payload: EdgeChange[] }
    | { type: 'CONNECT'; payload: Connection }
    | { type: 'UPDATE_NODE_FIELD'; payload: { nodeId: string; fieldName: string; fieldValue: any } };
  
  const workflowReducer =(state: WorkflowState, action: Action): WorkflowState => {
    switch (action.type) {
      case 'UPDATE_NODE_ID': {
        const type = action.payload;
        const newIDs = { ...state.nodeIDs };
        if (!newIDs[type]) {
          newIDs[type] = 0;
        }
        newIDs[type] += 1;
        return { ...state, nodeIDs: newIDs };
      }
  
      case 'ADD_NODE': {
        return { ...state, nodes: [...state.nodes, action.payload] };
      }
  
      case 'NODES_CHANGE': {
        return { ...state, nodes: applyNodeChanges(action.payload, state.nodes) };
      }
  
      case 'EDGES_CHANGE': {
        return { ...state, edges: applyEdgeChanges(action.payload, state.edges) };
      }
  
      case 'CONNECT': {
        const newEdge = addEdge(
          {
            ...action.payload,
            type: 'smoothstep',
            animated: true,
            markerEnd: { type: MarkerType.Arrow, height: 20, width: 20 },
          },
          state.edges
        );
        return { ...state, edges: newEdge };
      }
  
      case 'UPDATE_NODE_FIELD': {
        const { nodeId, fieldName, fieldValue } = action.payload;
        return {
          ...state,
          nodes: state.nodes.map((node) => {
            if (node.id === nodeId) {
              return {
                ...node,
                data: { ...node.data, [fieldName]: fieldValue },
              };
            }
            return node;
          }),
        };
      }
  
      default:
        return state;
    }
  }
  
  export { workflowReducer, initialState };
  