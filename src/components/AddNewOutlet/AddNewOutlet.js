import React  from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Row, Col } from 'react-bootstrap';

const AddNewOutlet = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const handleKeyPress = (e, index) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (index ===2) {
       return window.alert('Confirm Submit New Outlet? Click Submit');
      } else {
        handleSubmit(onSubmit)();
      }
    }
  };

  const onSubmit = (data) => {
    console.log(data, 'onSubmit called');
    reset();
  };

  return (
    <section>
      <Row>
        <Col lg={6} md={6} xs={6}>
          <h1 className="text-center">Add New Outlet Here!</h1>
        </Col>
      </Row>
      <Row>
        <Col lg={6} md={6} xs={6}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Enter the company name *</Form.Label>
              <Form.Control
                onKeyDown={(e) => handleKeyPress(e, 0)}
                type="text"
                placeholder="Company Name"
                {...register('companyName', { required: true })}
              />
              {errors.companyName && (
                <p>Please Enter the Company name *</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Enter the outlet name *</Form.Label>
              <Form.Control

                onKeyDown={(e) => handleKeyPress(e, 1)}
                type="text"
                placeholder="Outlet Name"
                {...register('outletName', { required: true })}
              />
              {errors.outletName && (
                <p>Please Enter the Outlet name</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Enter the GP%</Form.Label>
              <Form.Control

                onKeyDown={(e) => handleKeyPress(e, 2)}
                type="number"
                placeholder="GP"
                {...register('gp', { required: true })}
              />
              {errors.gp && (
                <p>Please Enter Gp</p>
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
};

export default AddNewOutlet;
