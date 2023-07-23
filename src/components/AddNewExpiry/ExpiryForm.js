import React, { useState } from 'react';
import { Col, Form, Row, Table } from 'react-bootstrap';

const ExpiryForm = ({ allProducts }) => {
  const [productQuantities, setProductQuantities] = useState({});

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
      quantity: productQuantities[product._id] || 0,
    }));

    // Use the array of objects as needed (e.g., send it to the server)
    console.log(productsWithQuantities,'asdkljasdklfj');
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
            {allProducts.map((product) => (
              <tr key={product._id}>
                <td>{product.productName}</td>
                <td>
                  <Form.Control
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
        <button onClick={handleSubmitExpiry}>Submit</button>
      </Col>
    </Row>
  );
};

export default ExpiryForm;
