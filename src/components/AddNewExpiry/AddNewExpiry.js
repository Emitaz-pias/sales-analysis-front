import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { Row, Form, Col } from 'react-bootstrap';
import ExpiryForm from './ExpiryForm';



const AddNewExpiry = () => {
    const [allOutlets, setAllOutlets] = useState([])
    const [allProducts, setAllProducts] = useState([])
    const [selectedOutlet, setSelectedOutlet] = useState('')
    const [selectedDate, setSelectedDate] = useState('')

        const [productSubmited, setProductSubmited] = useState(false)

    // load all the outlets and all the products
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
    return (
        <section>
            <h4 className='text-danger text-center'>
                Add New Expiry
            </h4>
            <Row className='mt-1'>
                <Col md={6} lg={5}>
                <Form onChange={handleOutletSelect}>
                    <Form.Select>
                        <option value="">Select Outlet</option>
                        {allOutlets.map((outlet, index) =>
                            <option key={index} value={outlet.companyName + ' ' + outlet.outletName}>{outlet.companyName + ' ' + outlet.outletName}</option>
                        )}
                    </Form.Select>
                </Form>
                </Col>
                <Col md={6} lg={5}>
                    <Form onChange={handleDateChange}>
                            <Form.Group>
                                <Form.Control type='date'>
                                </Form.Control>
                            </Form.Group>
                    </Form>
                </Col>
                
            </Row>
           <ExpiryForm productSubmited={productSubmited} setProductSubmited={setProductSubmited} selectedDate={selectedDate} selectedOutlet={selectedOutlet} allProducts={allProducts}/>
        </section>

    );
};

export default AddNewExpiry;