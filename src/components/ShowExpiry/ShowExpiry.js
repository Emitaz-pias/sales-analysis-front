import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Table } from 'react-bootstrap';
import LoadingSpinner from '../Layout/LoadingSpinner';


const ShowExpiry = () => {
  const { register, handleSubmit } = useForm();
  const [allOutlets, setAllOutlets] = useState([])
  const [selectedOutlet, setSelectedOutlet] = useState(undefined)
  const [expiryData, setExpriyData] = useState([])
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [deliveryDates, setDeliveryDates] = useState([])
  const [expiryDates, setExpiryDates] = useState([])
  const [totalDeliveryTk,setTotalDeliveryTk]=useState(0)
  const [totalReturnTk,setTotalReturnTk] =useState(0)
  const [percentageTk,setPercentageTk] = useState(0)
  // console.log(totalDeliveryTk,totalReturnTk);
  // console.log(percentageTk,'percentageTk');
  let [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:4040/getAllOutlets")
      .then((response) => {
        if (response.data) {
          setLoading(false)
        }
        setAllOutlets(response.data)
      })
      .catch((error) => {
        console.error("Error getting data:", error);
        // Handle the error here
      })
  }, [])

  const handleOutletSelect = (event) => {
    setSelectedOutlet(event.target.value)
  }



  // function calculateAverageDelivery(deliveryData, deliveryDates) {
  //   const productMap = new Map();

  //   // Step 1: Sum the total deliveredQuantity for each specific product
  //   function updateProductData(product, quantityToAdd) {
  //     const { productCode, productName } = product;
  //     const key = `${productCode}-${productName}`;

  //     if (!productMap.has(key)) {
  //       productMap.set(key, {
  //         productCode,
  //         productName,
  //         totalDeliveredQuantity: 0,
  //         averageDelivery: 0,
  //       });
  //     }

  //     productMap.get(key).totalDeliveredQuantity += quantityToAdd;
  //   }

  //   // Process deliveryData
  //   deliveryData.forEach((deliveredProduct) => {
  //     const { deliveredProducts } = deliveredProduct;

  //     deliveredProducts.forEach((product) => {
  //       const { deliveryQuantity } = product;
  //       updateProductData(product, parseInt(deliveryQuantity, 10));
  //     });
  //   });

  //   // Calculate average delivery for each specific product
  //   const result = Array.from(productMap.values());
  //   result.forEach((product) => {
  //     const { totalDeliveredQuantity } = product;
  //   const averageDelivery = totalDeliveredQuantity / deliveryDates.length || 0;
  //   product.averageDelivery = parseFloat(averageDelivery.toFixed(2)); 


  //   });


  //   setAvgDelivery(result);
  // }


  //
  
  // call the submit button
  const onSubmit = (data) => {
    setDateFrom(data.dateFrom)
    setDateTo(data.dateTo)
    setPercentageTk(amountPercentageCalculator(totalReturnTk,totalDeliveryTk))
    const expriyQuery = {
      outlet: selectedOutlet,
      dateFrom: new Date(data.dateFrom),
      dateTo: new Date(data.dateTo)
    }
    axios
      .get('http://localhost:4040/getExpiry', {
        params: expriyQuery
      })
      .then((response) => {
        calculateExpiredPercentage(response.data.deliveryData, response.data.expiryData)
        setDeliveryDates(response.data.deliveryData)
        setExpiryDates(response.data.expiryData)
        setTotalDeliveryTk(sumReturnAmount(response.data.deliveryData))
        setTotalReturnTk(sumReturnAmount(response.data.expiryData))
      })

      .catch((error) => {
        console.error("Error getting data:", error);
      })
  };


  // calculation part
  // money  percentage
  function amountPercentageCalculator (totalReturnTk,totalDeliveryTk){
    if(totalDeliveryTk&&totalReturnTk){
    const percentage = (totalReturnTk/totalDeliveryTk)*100
    const fixedPercentage=  percentage.toFixed(2)
    return fixedPercentage
  }
}
  
// sum return and delivery amount in tk
function sumReturnAmount(data) {
  if ( data.length > 0) {
    return data.reduce((total, item) => {
      const amount = item.returnAmount || item.deliveryAmount;
      if (amount !== undefined && amount !== null) {
        return total + parseInt(amount);
      } else {
        // Handle invalid or missing amount data
        return total;
      }
    }, 0);
  } else {
    // Handle empty or non-array data
    return 0; // or any default value you prefer
  }
}


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
        const { deliveryQuantity } = product;
        updateProductData(product, parseInt(deliveryQuantity, 10), false);
      });
    });

    // Process expiryData
    expiryData.forEach((expiredProduct) => {
      const { expiredProducts } = expiredProduct;
        expiredProducts.forEach((product) => {
        const { expiredQuantity } = product;
        updateProductData(product, parseInt(expiredQuantity, 10), true);
      });
    });

    // Step 2: Calculate the expired percentage for each specific product
    // const result = Array.from(productMap.values());
    // result.forEach((product) => {
    //   const { deliveredQuantity, expiredQuantity } = product;
    //   product.expiredPercentage = (expiredQuantity / deliveredQuantity) * 100 || 0;
    // });

    // new funcitons
    // Calculate the expired percentage and average delivery for each specific product
    const result = Array.from(productMap.values());
    result.forEach((product) => {
      const { deliveredQuantity, expiredQuantity } = product;
      product.expiredPercentage = (expiredQuantity / deliveredQuantity) * 100 || 0;

      if (deliveryDates.length > 0) {
        const averageDelivery = deliveredQuantity / deliveryDates.length || 0;
        product.averageDelivery = parseFloat(averageDelivery.toFixed(2));

        const expiredAmount = (product.expiredPercentage / 100) * averageDelivery;
        const projectedDelivery = (averageDelivery - expiredAmount).toFixed(3);
        product.projectedDelivery = parseFloat(projectedDelivery);
        // some comment
      }
    });

    return setExpriyData(result);
  }
  // avg delivery data


  // printing logics
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const printContent = document.querySelector('.print-content');
    if (printWindow && printContent) {
      printWindow.document.write('<html><head><title>Print</title></head><body>');
      printWindow.document.write(printContent.outerHTML);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <section>
      <h2 className='text-danger text-center'>show expiry</h2>
      {loading ? <LoadingSpinner loading={loading} /> :
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
        </Form>}

      <Row >
        <Col md={{ offset: 1, span: 10 }} className='print-content'>
          <h2 className='text-center'>{selectedOutlet}</h2>
          {selectedOutlet === undefined ? <p className='d-flex justify-content-center'><LoadingSpinner></LoadingSpinner></p> : <Table className='border border-danger' striped bordered hover responsive>
            <thead>
              <tr>
                <th>Delivery From</th>
                <th>Delivery To</th>
                <th>Total Delivery</th>
                <th>Total Expiry</th>
                <th>Total Delivery Amount</th>
                <th>Total Expiry Amount</th>
                <th>Total Expired  %</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                { }
                <td>{dateFrom}</td>
                <td>{dateTo}</td>
                <td>{deliveryDates.length}</td>
                <td>{expiryDates.length}</td>
                <td>{totalDeliveryTk}</td>
                <td>{totalReturnTk}</td> 
                <td>{percentageTk}</td>
                </tr>
            </tbody>
          </Table>}

          {expiryData.length > 0 ?
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Product Code</th>
                  <th>Product Name</th>
                  <th>Delivered Quantity</th>
                  <th>Expired Quantity</th>
                  <th>Expired Percentage</th>
                  <th>Current AVG Delivery</th>
                  <th>Projected Delivery</th>


                </tr>
              </thead>

              <tbody>
                {expiryData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.productCode}</td>
                    <td>{item.productName}</td>
                    <td>{item.deliveredQuantity}</td>
                    <td>{item.expiredQuantity}</td>
                    <td>{item.expiredPercentage > 0 && item.expiredPercentage.toFixed(2)}% </td>
                    <td>{item.averageDelivery > 0 && parseInt(item.averageDelivery)}</td>
                    <td>{item.projectedDelivery > 0 && parseInt(item.projectedDelivery.toFixed(2))}</td>

                  </tr>
                ))}</tbody>


            </Table> : <p className='d-flex justify-content-center'><LoadingSpinner></LoadingSpinner></p>}
        </Col>
        <Button variant="primary" onClick={handlePrint}>
          Print Data
        </Button>
      </Row>

    </section>
  )
}

export default ShowExpiry;
