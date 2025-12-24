import React from 'react';
import Dashboard from './components/Dashboard';
import { ToastProvider } from './components/ui/Toast';

function App() {
  return (
    <ToastProvider>
      <div className="App">
        <Dashboard />
      </div>
    </ToastProvider>
  );
}

export default App;
