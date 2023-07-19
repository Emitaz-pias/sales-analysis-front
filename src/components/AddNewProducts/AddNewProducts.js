import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Row, Col } from 'react-bootstrap';


const AddNewProducts = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const handleKeyPress = (e, index) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (index < 2) {
        const nextInput = document.getElementById(`input-${index + 1}`);
        nextInput && nextInput.focus();
      }
    }
  }

  const onSubmit = (data) => {
    reset();
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
              <Form.Label>Enter the product name *</Form.Label>
              <Form.Control
                id="input-0"
                onKeyDown={(e) => handleKeyPress(e, 0)}
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
                id="input-1"
                onKeyDown={(e) => handleKeyPress(e, 1)}
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
                id="input-2"
                onKeyDown={(e) => handleKeyPress(e, 2)}
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