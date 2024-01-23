import React from 'react';
import { useState, CSSProperties } from "react";
import ClockLoader from "react-spinners/ClockLoader";


const LoadingSpinner = ({loading}) => {
    let [color, setColor] = useState("red");
    
    return (  
       <ClockLoader
       color={color}
      loading={loading}
      size={50}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
    );
};

export default LoadingSpinner;