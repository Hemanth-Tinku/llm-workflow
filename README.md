# LLM Workflow Builder

[**Live Demo**](https://llm-workflow-hemanth-kumars-projects-54558d95.vercel.app/)  

## Overview

The LLM Workflow Builder is a React-based application that provides a user-friendly interface for constructing and executing workflows with language model (LLM) nodes. Users can create workflows by dragging and dropping nodes, linking them, and configuring various parameters for each node.

## High-Level Design (HLD) / Low-Level Design (LLD)

### High-Level Design

The application is designed as a single-page app (SPA) in React, leveraging the `useReducer` hook for state management. The application consists of multiple nodes that are interactively linked to define workflow processes. Each node is either an input, LLM (language model), or output node, each performing specific roles in data flow and processing.

### Low-Level Design

1. **State Management**: Uses `useReducer` in `workflowReducer` to handle state updates, manage node data, and facilitate interactions within the workflow.
2. **Node Structure**: Each node (Input, LLM, Output) has specific props and handlers for configuration and interaction. Errors and validations are managed at the node level, with a central reducer managing updates and resets.
3. **Event Flow**: Each workflow execution is handled sequentially, validating nodes and dispatching outputs where required.
4. **UI Styling**: Styles are modularized in a dedicated `styles` folder, providing consistent and reusable design elements across components.

## Folder Structure

The project’s structure follows a component-driven approach, grouping components based on their functionality as "molecules" and "organisms." Here is a breakdown of the main folders:

```plaintext
src/
├── components/
│   ├── organisms/
│   │   ├── Toolbar/             # Toolbar component for node selection
│   │   ├── Navbar/              # Navbar component with title and action buttons
│   │   └── WorkflowCanvas/      # Main canvas for creating and connecting nodes
│   │
│   └── molecules/
│       ├── InputNode/           # Input node component
│       ├── LLMNode/             # LLM node component
│       ├── OutputNode/          # Output node component
│       └── DraggableNode/       # Draggable wrapper for nodes
│
├── reducers/
│   └── workflowReducer.ts       # Reducer managing the state of the workflow and nodes
│
└── styles/                      # Contains all CSS-in-JS style objects for components
```

## Components Overview

### Organisms
High-level components that provide the main app structure and layout:
- **Toolbar**: Allows users to select different types of nodes (Input, LLM, Output) and drag them to the workflow canvas.
- **Navbar**: Displays the app title and a "Run Workflow" button, which initiates workflow execution.
- **WorkflowCanvas**: The primary workspace where users configure nodes and define their connections.

### Molecules
Smaller, reusable components that represent individual nodes or elements within a node:
- **InputNode**: Represents the input node where users can input data for the workflow.
- **LLMNode**: Represents the language model node, allowing users to configure model parameters.
- **OutputNode**: Displays the output of the workflow process.
- **DraggableNode**: A wrapper that enables drag-and-drop functionality for nodes on the canvas.

## State Management (React Reducer)

The application uses `useReducer` (in `workflowReducer.ts`) to manage complex interactions and state updates for each node in the workflow. The reducer manages actions such as updating node fields, setting errors, and resetting errors. This approach allows for a scalable and efficient way to handle state changes as the workflow grows in complexity.
