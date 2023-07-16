import React ,{ useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';


const AddNewProducts = () => {
  const [inputValue, setInputValue] = useState("");
  const count = useRef(0);

  useEffect(() => {
    count.current = count.current + 1;
  });
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  const handleKeyDown = (e)=>{
    setInputValue(e.target.value)
  }
  
    // const initialProducts = [
    //     { name: 'White Bread 500gm', quantity: '' },
    //     { name: 'White Bread 300gm', quantity: '' },
    //     { name: 'Milk Bread 300gm', quantity: '' },
    //     { name: 'Multigrain Bread 300gm', quantity: '' },
    //   ];
    
    //   const [products, setProducts] = useState(initialProducts);
    
    //   const handleChangeQuantity = (index, event) => {
    //     const newProducts = [...products];
    //     newProducts[index].quantity = event.target.value;
    //     setProducts(newProducts);
    //   };
    
    //   const handleKeyDown = (event, index) => {
    //     if (event.key === 'Enter') {
    //       event.preventDefault();
    //       if (index < products.length - 1) {
    //         const nextInput = document.getElementById(`quantity-${index + 1}`);
    //         nextInput.focus();
    //       }
    //     }
    //   };    
    //   const handleSubmit = (event) => {
    //     event.preventDefault();
    //     console.log('Form submitted:', products);
    //     // Perform any other desired actions with the submitted data
    //   };
    return (
        <div>
          <form>
      <input
         value={inputValue}
        onKeyDown={(e)=>handleKeyDown(e)} 
        type="text" placeholder="Product Name"/>
      <br/>
      <h1>Render Count: {count.current}</h1>
      <input type="text" placeholder="Category" {...register("Category", {required: true})} />
      <br/>
      <input  type="text" placeholder="MRP" {...register("MRP", {required: true})} />
      <br/>
      <input  type="number" placeholder="Unit" {...register("Unit", {required: true})} />
      <br/>
      <input type="submit" />
    </form>
        {/* <form onSubmit={handleSubmit}>
          {products.map((product, index) => (
            <div key={index}>
              <label>
                {product.name}:
                <input
                  id={`quantity-${index}`}
                  type="text"
                  value={product.quantity}
                  onChange={(event) => handleChangeQuantity(index, event)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                />
              </label>
            </div>
          ))}
            <button onSubmit={handleSubmit} type="submit">Submit</button>
        </form> */}
      </div>
    );
};

export default AddNewProducts;