import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import './Mysidebar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBreadSlice, faCalculator, faHouse, faShop, faSkullCrossbones, faTable, faTruck, faX, faXmark } from '@fortawesome/free-solid-svg-icons';

const Mysidebar = () => {
    const [collapsed,setCollapsed] =useState(false)
    const onCollapesd=() => {
        setCollapsed(!collapsed)
    }
    
    return (
        <Sidebar
        rootStyles={{position: 'fixed',height: '100vh',width: '3vw',color: 'white'}}
         collapsed={collapsed}
         backgroundColor={'#283618' }
         transitionDuration={600}>
         <Menu>
            <MenuItem   onClick={onCollapesd}>{collapsed? <FontAwesomeIcon  beatFade icon={faBars} color='pink'/>: <FontAwesomeIcon icon={faX } spin />}</MenuItem>
            <MenuItem  component={<Link className='customSidebarMenu' to="/"/>}> <FontAwesomeIcon icon={faHouse} /> <span  className='ms-2'>Home</span> </MenuItem>
            <MenuItem component={<Link className='customSidebarMenu'   to="/addNewOutlet" />}> <FontAwesomeIcon icon={faShop} /> <span className='ms-2'>Add New Outlet</span></MenuItem>
            <MenuItem component={<Link className='customSidebarMenu'   to="/addNewProducts" />}> <FontAwesomeIcon icon={faBreadSlice} /> <span className='ms-2'>Add New Products</span></MenuItem>
            <MenuItem component={<Link className='customSidebarMenu'   to="/addNewExpiry" />}> <FontAwesomeIcon icon={faSkullCrossbones} color='red' beatFade /> <span className='ms-2'> Add New Expiray</span></MenuItem>
            <MenuItem component={<Link className='customSidebarMenu'   to="/addNewDelivery" />}> <FontAwesomeIcon icon={faTruck} /> <span className='ms-2'>Add New Delivery</span> </MenuItem>
            <MenuItem component={<Link className='customSidebarMenu'   to="/showExpiry" />}><FontAwesomeIcon icon={faCalculator} /> <span className='ms-2'> Show Expiry Reports</span> </MenuItem>
            <MenuItem component={<Link className='customSidebarMenu'   to="/showProjection" />}> <FontAwesomeIcon icon={faTable} /> <span className='ms-2'> Show Projection</span></MenuItem>

            
        </Menu>
</Sidebar>
    );
};

export default Mysidebar;