import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const ShowExpiry = () => {
  const { register, handleSubmit} = useForm();
  const [allOutlets, setAllOutlets] = useState([])
  const [selectedOutlet, setSelectedOutlet] = useState('')

  
  useEffect(() => {
    axios
        .get(" http://localhost:4040/getAllOutlets")
        .then((response) => {
            setAllOutlets(response.data)
        })
        .catch((error) => {
            console.error("Error getting data:", error);
            // Handle the error here
        }) }, [])

        const handleOutletSelect = (event) => {
          setSelectedOutlet(event.target.value)
      }
      const onSubmit =(data) => {
        const expriyQuery ={
          outlet:selectedOutlet,
          dateFrom:new Date(data.dateFrom),
          dateTo:new Date(data.dateTo)
        }
        axios
        .get('http://localhost:4040/getExpiry',{
          params: expriyQuery
        })
        .then((response) => {
          console.log(response.data,'is the data')})
        .catch((error) => {
          console.error("Error getting data:", error);
        })
      };
  return (
    <section>
      <h2 className='text-danger text-center'>show expiry</h2>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col>

            <Form.Group >
                    <Form.Label>Enter Outlet Name </Form.Label>

                    <Form.Select onChange={handleOutletSelect}>
                        <option value="">Select Outlet</option>
                        {allOutlets.map((outlet, index) =>
                            <option key={index} value={outlet.companyName + ' ' + outlet.outletName} >{outlet.companyName + ' ' + outlet.outletName}</option>
                        )}
                    </Form.Select>
            </Form.Group>
          </Col>
          <Col>
          <Form.Group>
          <Form.Label>Date From</Form.Label>
          <Form.Control type="date" placeholder="Date From" {...register("dateFrom", { required: true })} />

          </Form.Group>

          </Col>
          <Col>
          <Form.Group>
          <Form.Label>Date To</Form.Label>
            <Form.Control type="date" placeholder="Date To" {...register("dateTo", { required: true })} />
            </Form.Group>
             </Col>
        </Row>

        <Form.Control className='mt-3' type="submit" />
      </Form>
    </section>
  );
};

export default ShowExpiry;