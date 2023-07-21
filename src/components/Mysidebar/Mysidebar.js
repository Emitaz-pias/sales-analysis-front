import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

const Mysidebar = () => {
    const [collapsed,setCollapsed] =useState(false)
    const onCollapesd=() => {
        setCollapsed(!collapsed)
    }
    
    return (
        <Sidebar
        rootStyles={{position: 'absolute',height: '100vh',width: '3vw'}}
         collapsed={collapsed}  backgroundColor={'lightgrey'}
         transitionDuration={600}>
         <Menu >
         <MenuItem onClick={onCollapesd}>{collapsed?'open':'close'}</MenuItem>
            <MenuItem component={<Link to="/"/>}>Home</MenuItem>
            <MenuItem component={<Link to="/addNewOutlet" />}> Add New Outlet</MenuItem>
            <MenuItem component={<Link to="/addNewProducts" />}> Add New Products</MenuItem>
            <MenuItem component={<Link to="/addNewExpiry" />}> Add New Expiray</MenuItem>
            <MenuItem component={<Link to="/addNewDelivery" />}> Add New Delivery</MenuItem>
            <MenuItem component={<Link to="/showExpiry" />}> Show Calculation</MenuItem>
            <MenuItem component={<Link to="/showProjection" />}> Show Projection</MenuItem>

            
        </Menu>
</Sidebar>
    );
};

export default Mysidebar;