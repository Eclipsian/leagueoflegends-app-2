import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './page/Home';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
    </Routes>
  );}

export default App;
