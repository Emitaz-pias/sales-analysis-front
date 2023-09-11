import React from 'react';
import Mysidebar from '../Mysidebar/Mysidebar';
import { Col, Row } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../Loading/Loading';


const Layout = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // Simulate an asynchronous operation, like connecting to the server.
        // Replace this with your actual server connection logic.
        async function connectToServer() {
          try {  
           const  response = await fetch('http://localhost:4040/')
           if(response.status===200){
            setLoading(false);
           }
       
          } catch (error) {
            console.error('Error connecting to the server:', error);
            // Handle the error here, if needed.
          }
        }
    
        // Call the function to connect to the server.
        connectToServer();
      }, []);

    return (
        <>
        {
            loading?<Loading/> :<> <Row style={{backgroundColor:'gray'}} className='w-100 mainPage'>
          
            <Col md={2} lg={3}>
            <Mysidebar/>
            </Col>
            <Col  md={9} lg={9}>
                <Outlet/>
            </Col>  
        </Row></>
        }
        </>
       
    );
};

export default Layout;