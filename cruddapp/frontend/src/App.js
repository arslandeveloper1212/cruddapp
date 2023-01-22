import Navbar from './Components/Navbar';
import './App.css';
import Home from './Components/Home';
import { Route,Routes } from 'react-router-dom';
import Register from './Components/Register';
import Edit from './Components/Edit';
import View from './Components/View';
import Delete from './Components/Delete';



function App() {
  return (
    <div>
   <Navbar/>
   
   <Routes>
   <Route exact path='/' element= {<Home/>}/>
   <Route exact path='/register' element= {<Register/>}/>
   <Route exact path= "/edit/:id" element={<Edit/>}/>
   <Route exact path= "/view/:id" element={<View/>}/>
   <Route exact path= "/delete/:id" element={<Delete/>}/>
   </Routes>
 
    </div>
  );
}

export default App;
