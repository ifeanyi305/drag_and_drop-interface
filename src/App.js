import { Routes, Route } from 'react-router-dom';
import '@atlaskit/css-reset';
import DragAndDrop from './Pages/DragAndDrop';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<DragAndDrop />} />
      </Routes>
    </div>
  );
}

export default App;
