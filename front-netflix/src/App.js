import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes , Route} from 'react-router-dom'; 
import Home from './components/Home';
import FavList from './components/FavList';

function App() {
  return (
    <>
    <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/favlist' element={<FavList/>}> </Route>
  
    </Routes>
    </>
  );
}

export default App;
