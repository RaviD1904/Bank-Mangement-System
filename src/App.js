import './App.css';
import Login from './components/Login';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Dash from './components/Dash';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/dash" element={<Dash/>}/>
        </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;
