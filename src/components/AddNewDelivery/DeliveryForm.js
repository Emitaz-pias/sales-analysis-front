import axios from 'axios';
import React, { useState } from 'react';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';

const DeliveryForm = ({ allProducts,selectedOutlet,selectedDate,setProductSubmited,productSubmited }) => {
  const [productQuantities, setProductQuantities] = useState({});

  const handleKeyPress = (e, index) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (index <30) {
        const nextInput = document.getElementById(`input-${index + 1}`);
        nextInput && nextInput.focus();
      }
    }
  
  }
  const handleQuantityChange = (productId, quantity) => {
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  const handleSubmitDelivery = () => {
    // Combine product names and quantities into a single array of objects
    const productsWithQuantities = allProducts.map((product) => ({
      ...product,
      deliveryQuantity: productQuantities[product._id] || 0,
    })
    );
    // Use the array of objects as needed (e.g., send it to the server)
    const deliveryDetails ={
      outletName:selectedOutlet,
      deliveryDate:selectedDate,
      deliveredProducts:productsWithQuantities
    }
    axios
    .post(" http://localhost:4040/postNewDelivery", deliveryDetails)
    .then((response) => {
      if (response.data === true) {
        setProductSubmited(true);
        setProductQuantities({}); 
      }
      
    })
    .catch((error) => {
      console.error("Error submitting data:", error);
      // Handle the error here
    });
  };

  return (
    <Row className='mt-1' style={{ height: '90vh', border: '2px dotted gray', overflowY: 'scroll' }}>
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
        </Table>
        <Button onClick={handleSubmitDelivery}>Post To Database</Button>
      </Col>

    </Row>
  );
};

export default DeliveryForm;
