import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
    const opsArray=[
        { path: '/addNewOutlet', label: 'Add New Outlet' },
        { path: '/addNewProducts', label: 'Add New Product' },
        { path: '/addNewExpiry', label: 'Add New Expiry' },
        { path: '/addNewDelivery', label: 'Add New Delivery' },
        { path: '/showExpiry', label: 'Show Expiry Report' },
        { path: '/showProjection', label: 'Show Projection' },
      ];
    return (
        <div>
           <div style={{height:'100vh'}} className="route-box-container">
      {opsArray.map((route, index) => (
        <div key={index}  className="route-box">
          <Link to={route.path}>
            <div style={{backgroundColor:'#121212',color:'white',width:'10em' ,borderRadius:'1em',height:'10vh',margin:'1em',textAlign:'center'}} className="box-content">
              {route.label}
            </div>
          </Link>
        </div>
      ))}
    </div>
        </div>
    );
};

export default Homepage;