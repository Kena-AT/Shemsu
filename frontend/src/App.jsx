import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ReactQueryProvider } from './lib/react-query';

function App() {
  return (
    <ReactQueryProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-blue-600">Welcome to Shemsu</h1>
          <p className="mt-4 text-gray-600">Phase 0 Core Infrastructure Ready</p>
        </div>
        <Routes>
          <Route path="/" element={null} />
        </Routes>
      </Router>
    </ReactQueryProvider>
  );
}

export default App;
