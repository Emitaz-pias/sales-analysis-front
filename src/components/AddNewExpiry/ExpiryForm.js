import axios from 'axios';
import React, { useState } from 'react';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';

const ExpiryForm = ({ productSubmited,allProducts,selectedOutlet,selectedDate ,setProductSubmited,returnAmount}) => {
  const [productQuantities, setProductQuantities] = useState({});

  const handleKeyPress = (e, index) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (index <30) {
        const nextInput = document.getElementById(`input-${index + 1}`);
        nextInput && nextInput.focus();
      }
    }}
  const handleQuantityChange = (productId, quantity) => {
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  const handleSubmitExpiry = () => {
    // Combine product names and quantities into a single array of objects
    const productsWithQuantities = allProducts.map((product) => ({
      ...product,
      expiredQuantity: productQuantities[product._id] || 0,
    })
    );
    // Use the array of objects as needed (e.g., send it to the server)
    const expiryDetails ={
      outletName:selectedOutlet,
      expiryDate:new Date(selectedDate),
      expiredProducts:productsWithQuantities,
      returnAmount:returnAmount
    }
    axios
    .post(" http://localhost:4040/postNewExpriry", expiryDetails)
    .then((response) => {
      if(response.data===true){
        setProductSubmited(true)
        setProductQuantities({}); 

      }
    })
    .catch((error) => {
      console.error("Error submitting data:", error);
      // Handle the error here
    });
  
  };
  const handleAddNewExpiry = (e) => {
    e.stopPropagation(); // Prevent the event from bubbling up to parent elements
    
    setProductSubmited(!productSubmited);
  };

  return (
    <div>
        {productSubmited?<p className='text-success'>Congratulations!! Expriry Added <Button onClick={ handleAddNewExpiry} >Add New Expiry</Button></p>:<Row className='mt-1' style={{ height: '90vh', border: '2px dotted gray', overflowY: 'scroll' }}>
      <Col md={{ span: 11 }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((product,index) => (
              <tr key={product._id}>
                <td>{product.productName}</td>
                <td>
                  <Form.Control
                    id={`input-${index}`}
                    onKeyDown={(e) => handleKeyPress(e, index)}
                    type='number'
                    min='0'
                    value={productQuantities[product._id] || ''}
                    onChange={(e) => handleQuantityChange(product._id, parseInt(e.target.value))}
                  />
                </td>
              </tr>
            ))}
          </tbody>
          <Form.Control
                    id={`inputAmount`}
                    type='number'
                    min='0'
                    placeholder='Return Amount In TK'              
                  />
        </Table>
        
        <Button onClick={handleSubmitExpiry}>Post To Database</Button>
      </Col>
    </Row>}
    </div>
    
  );
};

export default ExpiryForm;
