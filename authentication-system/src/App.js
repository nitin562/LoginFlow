import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import Register from './Components/Register';
import GiveContext from './context/MainState';

function App() {
  return (
    <GiveContext>
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/Register' element={<Register/>}/>
      </Routes>
    
    </Router>
    </GiveContext>
  )
}

export default App;
