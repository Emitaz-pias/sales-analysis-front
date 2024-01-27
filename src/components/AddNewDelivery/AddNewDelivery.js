import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {  Col, Form, Row } from 'react-bootstrap';
import DeliveryForm from './DeliveryForm';


const AddNewDelivery = () => {
    const [allOutlets, setAllOutlets] = useState([])
    const [allProducts, setAllProducts] = useState([])
    const [selectedOutlet, setSelectedOutlet] = useState('')
    const [selectedDate, setSelectedDate] = useState('')
    const [productSubmited, setProductSubmited] = useState(false)
    const [deliveryAmount,setDeliveryAmount] =useState('')

    useEffect(() => {
        axios
            .get(" http://localhost:4040/getAllOutlets")
            .then((response) => {
                setAllOutlets(response.data)
            })
            .catch((error) => {
                console.error("Error getting data:", error);
                // Handle the error here
            });

        axios
            .get(" http://localhost:4040/getAllProducts")
            .then((response) => {
                setAllProducts(response.data)

            })
            .catch((error) => {
                console.error("Error gettin data:", error);
                // Handle the error here
            });

    }, [])
   
    const handleOutletSelect = (event) => {
        setSelectedOutlet(event.target.value)
    }
    const handleDateChange = (e) =>{
        setSelectedDate(e.target.value)
    }
 const handleDeliveryAmount=(event)=>{
setDeliveryAmount(event.target.value)

 }

    return (
        <section>
        <h4 className='text-success text-center'>
            Add New Delivery
        </h4>
        <Row className='mt-1'>
            <Col md={5} lg={5}>
            <Form onChange={handleOutletSelect}>
                <Form.Select>
                    <option value="">Select Outlet</option>
                    {allOutlets.map((outlet, index) =>
                        <option key={index} value={outlet.companyName + ' ' + outlet.outletName}>{outlet.companyName + ' ' + outlet.outletName}</option>
                    )}
                </Form.Select>
            </Form>
            </Col>
            <Col md={4} lg={4}>
                <Form onChange={handleDateChange}>
                        <Form.Group>
                            <Form.Control type='date'>
                            </Form.Control>
                        </Form.Group>
                </Form>
            </Col>
            <Col md={2} lg={2}>
                <Form onChange={handleDeliveryAmount}>
                        <Form.Group>
                            <Form.Control placeholder='deliveryAmount'/>
                        </Form.Group>
                </Form>
            </Col>
            
        </Row>
       <DeliveryForm productSubmited={productSubmited} setProductSubmited={setProductSubmited} selectedDate={selectedDate} selectedOutlet={selectedOutlet} allProducts={allProducts} deliveryAmount={deliveryAmount}/>
    </section>
    );
};

export default AddNewDelivery;