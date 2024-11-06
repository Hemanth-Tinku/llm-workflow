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
  | { type: 'ADD_NODE'; payload: Node }
  | { type: 'NODES_CHANGE'; payload: NodeChange[] }
  | { type: 'EDGES_CHANGE'; payload: EdgeChange[] }
  | { type: 'CONNECT'; payload: { connection: Connection, llmNodeId: string, connectedNode: Node } }
  | { type: 'UPDATE_NODE_FIELD'; payload: { nodeId: string; fieldName: string; fieldValue: any } }
  | { type: 'SET_FIELD_ERROR'; payload: { nodeId: string, fieldName: string, errorMessage: string } }
  | { type: 'RESET_FIELD_ERROR'; payload: { nodeId: string, fieldName: string } }

const workflowReducer = (state: WorkflowState, action: Action): WorkflowState => {
  switch (action.type) {

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
      const { connection, llmNodeId, connectedNode } = action.payload;
      const newEdge = addEdge(
        {
          ...connection,
          type: 'smoothstep',
          animated: true,
          markerEnd: { type: MarkerType.Arrow, height: 20, width: 20 },
        },
        state.edges
      );

      let updatedNodes = [...state.nodes];

      if (llmNodeId && connectedNode.type === 'inputNode') {
        updatedNodes = state.nodes.map((node) => {
          if (node.id === llmNodeId) {
            return {
              ...node,
              data: { ...node.data, inputNodeId: connectedNode.id },
            };
          }
          return node;
        });
      } else if (llmNodeId && connectedNode.type === 'outputNode') {
        updatedNodes = state.nodes.map((node) => {
          if (node.id === llmNodeId) {
            return {
              ...node,
              data: { ...node.data, outputNodeId: connectedNode.id },
            };
          }
          return node;
        });
      }

      return { ...state, edges: newEdge, nodes: updatedNodes };
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

    case 'SET_FIELD_ERROR': {
      const { nodeId, fieldName, errorMessage } = action.payload;
      return {
        ...state,
        nodes: state.nodes.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: {
                ...node.data, errors:
                {
                  ...node.data.errors,
                  [fieldName]: errorMessage
                }
              },
            };
          }
          return node;
        }),
      }
    }

    case 'RESET_FIELD_ERROR': {
      const { nodeId, fieldName } = action.payload;
      return {
        ...state,
        nodes: state.nodes.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: {
                ...node.data,
                errors: {
                  ...node.data.errors,
                  [fieldName]: ''
                },
              },
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
