import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Component/Login';
import Signup from './Component/Signup';
import Userpage from './Component/Userpage';

function App() {
  return (

    <div className='App'>

    <BrowserRouter >

      <Routes>

        <Route path='/' element={<Login/>}></Route>

        <Route path='/signup' element={<Signup/>}></Route>

        <Route path='/dashbord' element={<Userpage/>}></Route>


      </Routes>



    </BrowserRouter>  

    </div>

  );
}

export default App;
