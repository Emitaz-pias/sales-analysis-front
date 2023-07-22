import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from "axios";


const AddNewProducts = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const handleKeyPress = (e, index) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (index < 3) {
        const nextInput = document.getElementById(`input-${index + 1}`);
        nextInput && nextInput.focus();
      }
    }
  }

  const onSubmit = (data) => {
     axios
    .post(" http://localhost:4040/postNewProduct", data)
    .then((response) => {
      if(response.data===true){
        reset();
      }
    })
    .catch((error) => {
      console.error("Error submitting data:", error);
      // Handle the error here
    });
    console.log(data, 'onSubmit called');

  };

  return (
    <section>
       <Row>
        <Col lg={6} md={6} xs={6}>
          <h1 className="text-center">Add New Products Here!</h1>
        </Col>
      </Row>
      <Row>
        <Col lg={6} md={6} xs={6}>
          <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
              <Form.Label>Enter the product code *</Form.Label>
              <Form.Control
                id="input-0"
                onKeyDown={(e) => handleKeyPress(e, 0)}
                type="number"
                placeholder="product Code"
                {...register('productCode', { required: true })}
              />
              {errors.companyName && (
                <p>Please Enter the product Code *</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Enter the product name *</Form.Label>
              <Form.Control
                id="input-1"
                onKeyDown={(e) => handleKeyPress(e, 1)}
                type="text"
                placeholder="product Name"
                {...register('productName', { required: true })}
              />
              {errors.companyName && (
                <p>Please Enter the product name *</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Enter category *</Form.Label>
              <Form.Control
                id="input-2"
                onKeyDown={(e) => handleKeyPress(e, 2)}
                type="text"
                placeholder="category Name"
                {...register('category', { required: true })}
              />
              {errors.outletName && (
                <p>Please Enter category</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>MRP</Form.Label>
              <Form.Control
                id="input-3"
                onKeyDown={(e) => handleKeyPress(e, 3)}
                type="number"
                placeholder="MRP"
                {...register('price', { required: true })}
              />
              {errors.gp && (
                <p>Please Enter MRP</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Button type="submit">Submit</Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      
    </section>
  );
}


export default AddNewProducts;