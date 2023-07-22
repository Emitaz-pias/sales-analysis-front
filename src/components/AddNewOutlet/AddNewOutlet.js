import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios, { formToJSON } from "axios";


const AddNewOutlet = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [productSubmited,setProductSubmited] = useState(false)

  const handleKeyPress = (e, index) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (index < 2) {
        const nextInput = document.getElementById(`input-${index + 1}`);
        nextInput && nextInput.focus();
      }
    }}
     
// else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
//   e.preventDefault();
//   if (index > 0) {
//     const nextInput = document.getElementById(`input-${index + 1}`);
//     console.log('nextIp',nextInput)
//     nextInput && nextInput.focus();
//   }
// } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
//   e.preventDefault();
//   if (index < 2) {
//     const nextInput = document.getElementById(`input-${index - 1}`);
//     nextInput && nextInput.focus();
//     console.log('nextIp',nextInput)

//   }
// }
//   };

  const onSubmit = (data) => {
    axios
    .post(" http://localhost:4040/postOutlet", data)
    .then((response) => {
      if(response.data===true){
        setProductSubmited(true)
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
          <h1 className="text-center">Add New Outlet Here!</h1>
        </Col>
      </Row>
     {
      productSubmited?
      <Row>
        <Col>
        <h2>Congratulation!!OUtlet saved</h2>
        </Col>
      </Row>: <Row>
        <Col lg={6} md={6} xs={6}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Enter the company name *</Form.Label>
              <Form.Control
                id="input-0"
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
                id="input-1"
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
                id="input-2"
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
     }
    </section>
  );
};

export default AddNewOutlet;
