import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddNewOutlet from './components/AddNewOutlet/AddNewOutlet';
import AddNewProducts from './components/AddNewProducts/AddNewProducts';
import Layout from './components/Layout/Layout';
import Homepage from './components/Homepage/Homepage';
import AddNewDelivery from './components/AddNewDelivery/AddNewDelivery';
import AddNewExpiry from './components/AddNewExpiry/AddNewExpiry';
import ShowExpiry from './components/ShowExpiry/ShowExpiry';
import ShowProjection from './components/ShowProjection/ShowProjection';




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
        <Route path="/" exact element={<Homepage />}/>
        <Route path="/addNewOutlet" element={<AddNewOutlet />}/>
        <Route path="/addNewProducts" element={<AddNewProducts />}/>
        <Route path="/addNewExpiry" element={<AddNewExpiry />}/>
        <Route path="/addNewDelivery" element={<AddNewDelivery />}/>
        <Route path="/showExpiry" element={<ShowExpiry   />}/>
        <Route path="/showProjection" element={<ShowProjection   />}/>

        



        
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
