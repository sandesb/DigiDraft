import './App.css';
import './tailwind.css';
import './tailwind.output.css';


import { BrowserRouter, Routes, Route} from "react-router-dom";
import Sidebar from "./component/Sidebar";
import Layout from './component/Layout';
import Header from './component/Header';
import Form1 from './component/Form1';
import Form2 from './component/Form2';

import Table from './component/Table';
import Sprint from './component/Sprint';
import Record from './component/Record';


function App() {
  return (

    <div>
    <BrowserRouter>
    
      <Routes> 
      <Route path="/" element={<Layout/> }>
      <Route index element={<Table/>}></Route>

        <Route path="Sidebar" element={<Sidebar/>}></Route>

        <Route path="Header" element={<Header/>}></Route>
        <Route path="Form1" element={<Form1/>}></Route>
        <Route path="Form2" element={<Form2/>}></Route>

        <Route path="Sprint/:ids" element={<Sprint/>}></Route>
        <Route path="Record" element={<Record/>}></Route>





      </Route>
      </Routes>
      </BrowserRouter>
</div>
  );
}

export default App;
