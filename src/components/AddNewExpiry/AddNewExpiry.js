import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { Row, Form, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';



const AddNewExpiry = () => {
    const [allOutlets, setAllOutlets] = useState([])
    const [allProducts, setAllProducts] = useState([])
    const [selectedOutlet, setSelectedOutlet] = useState()
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
    //upload the expiry
    const onSubmit = (data) => {
        // axios
        //     .post(" http://localhost:4040/newExpiry", data)
        //     .then((response) => {
        //         if (response.data === true) {
        //             setProductSubmited(true)
        //             reset();
        //         }
        //     })
        //     .catch((error) => {
        //         console.error("Error submitting data:", error);
        //         // Handle the error here
        //     });
        console.log(data, 'onSubmit called');

    };
    const handleOutletSelect = (event) => {
        setSelectedOutlet(event.target.value)
    }
    return (
        <section>
            <Row>
            <Col md={{span:8,offset:2}}>
                <h2 className='text-secondary'>Add New Expriy From Here!</h2>
            </Col>
            </Row>
            <Row className='mt-5'>
                <Form onChange={handleOutletSelect}>
                    <Form.Select>
                        <option value="">Select Outlet</option>
                        {allOutlets.map((outlet, index) =>
                            <option key={index} value={outlet.companyName + ' ' + outlet.outletName}>{outlet.companyName + ' ' + outlet.outletName}</option>
                        )}
                    </Form.Select>
                </Form>
            </Row>
            <Row styles={{border:'dotted'}}>
                <Col md={{offset:1,span:10}}>
                  {
                    allProducts.map((product,index)=>(
                        <p>{product.productName}</p>
                    ))
                  }
                </Col>
      </Row>
     
        </section>

    );
};

export default AddNewExpiry;