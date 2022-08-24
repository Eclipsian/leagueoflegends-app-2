import { Routes, Route } from 'react-router-dom';
import DetailPage from './page/Detail';
import HomePage from './page/Home';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='champion'>
        <Route path=':name' element={<DetailPage />} />
      </Route>
    </Routes>
  );}

export default App;
