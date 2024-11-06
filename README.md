# LLM Workflow Builder

[**Live Demo**](https://llm-workflow-hemanth-kumars-projects-54558d95.vercel.app/)

## Overview

The LLM Workflow Builder enables users to create and connect different nodes to simulate workflows involving input data, LLM configuration, and output results.

### Key Features

- **Input Nodes**: Allows users to provide inputs for LLM processing.
- **LLM Configuration Nodes**: Accepts essential parameters, such as model name, API key, base URL, temperature, and max tokens.
- **Output Nodes**: Displays the generated responses based on LLM processing.
- **Drag-and-Drop Interface**: Uses `reactflow` to allow easy node creation and management.
- **Validation and Error Handling**: Ensures that each node has required fields before executing workflows, with real-time error messages.
- **Dynamic Workflow Execution**: On clicking "Run Workflow," all inputs are validated, and outputs are generated based on user configurations.

### Technologies Used

- **React.js** and **TypeScript** for building a type-safe and component-driven UI.
- **Reactflow** for creating an interactive, drag-and-drop workflow builder.
- **Redux** for state management across the application.
- **Vercel** for deployment, providing a fast and accessible live demo.

### How It Works

1. **Drag nodes** from the toolbar to the main area.
2. **Configure** each node with appropriate inputs, such as LLM settings (model, API key, etc.).
3. **Run the workflow** to get the output based on the LLM response.
4. **Error Handling**: Each node validates required fields, showing error messages for missing configurations.

