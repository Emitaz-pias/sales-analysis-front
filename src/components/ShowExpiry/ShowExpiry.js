import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Table } from 'react-bootstrap';


const ShowExpiry = () => {
  const { register, handleSubmit} = useForm();
  const [allOutlets, setAllOutlets] = useState([])
  const [selectedOutlet, setSelectedOutlet] = useState('')
  const [expiryData,setExpriyData] = useState([])

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
      // calculation part
function calculateExpiredPercentage(deliveryData, expiryData) {
  const productMap = new Map();

  // Step 1: Sum the total deliveredQuantity and total expiredQuantity for each specific product
  function updateProductData(product, quantityToAdd, isExpired) {
    const { productCode, productName } = product;
    const key = `${productCode}-${productName}`;

    if (!productMap.has(key)) {
      productMap.set(key, {
        productCode,
        productName,
        deliveredQuantity: 0,
        expiredQuantity: 0,
        expiredPercentage: 0,
      });
    }

    if (isExpired) {
      productMap.get(key).expiredQuantity += quantityToAdd;
    } else {
      productMap.get(key).deliveredQuantity += quantityToAdd;
    }
  }

  // Process deliveryData
  deliveryData.forEach((deliveredProduct) => {
    const { deliveredProducts } = deliveredProduct;

    deliveredProducts.forEach((product) => {
      const {  deliveryQuantity } = product;
      updateProductData(product, parseInt(deliveryQuantity, 10), false);
    });
  });

  // Process expiryData
  expiryData.forEach((expiredProduct) => {
    const { expiredProducts } = expiredProduct;

    expiredProducts.forEach((product) => {
      const {expiredQuantity } = product;
      updateProductData(product, parseInt(expiredQuantity, 10), true);
    });
  });

  // Step 2: Calculate the expired percentage for each specific product
  const result = Array.from(productMap.values());
  result.forEach((product) => {
    const { deliveredQuantity, expiredQuantity } = product;
    product.expiredPercentage = (expiredQuantity / deliveredQuantity) * 100 || 0;
  });

  return setExpriyData( result);
}



      
      //
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
     calculateExpiredPercentage(response.data.deliveryData,response.data.expiryData)
})
          
        .catch((error) => {
          console.error("Error getting data:", error);
        })
      };
 
      const handlePrint = () => {
        window.print();
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
      <Row>
<Col md={{ offset:1,span:10}}>
<Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Product Code</th>
          <th>Product Name</th>
          <th>Delivered Quantity</th>
          <th>Expired Quantity</th>
          <th>Expired Percentage</th>
        </tr>
      </thead>
 
        {expiryData.length!==0?<tbody>{expiryData.map((item, index) => (
          <tr key={index}>
            <td>{item.productCode}</td>
            <td>{item.productName}</td>
            <td>{item.deliveredQuantity}</td>
            <td>{item.expiredQuantity}</td>
            <td>{item.expiredPercentage}%</td>
          </tr>
        ))}</tbody>:<h1>select outlet and date to get expiry Data</h1>}
        
   
    </Table>
</Col>
<Button variant="primary" onClick={handlePrint}>
        Print Data
      </Button>
      </Row>
    </section>
  );
};

export default ShowExpiry;
