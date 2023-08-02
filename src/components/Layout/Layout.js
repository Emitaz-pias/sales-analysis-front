import React from 'react';
import Mysidebar from '../Mysidebar/Mysidebar';
import { Col, Row } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <Row style={{backgroundColor:'gray'}} className='w-100 mainPage'>
            <Col md={2} lg={3}>
            <Mysidebar/>
            </Col>
            <Col  md={9} lg={9}>
                <Outlet/>
            </Col>  
        </Row>
    );
};

export default Layout;