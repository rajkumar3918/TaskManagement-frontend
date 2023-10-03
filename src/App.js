import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router';
import Register from './pages/registerPage';
import Signin from './pages/loginPage';
import Homepage from './pages/homePage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Signin/>}/>
        <Route path='/Register' element={<Register/>}/>
        <Route path='/home' element={<Homepage/>}/>
      </Routes>
    </div>
  );
}

export default App;
