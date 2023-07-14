import React, { useState } from 'react';


const AddNewProducts = () => {
    const initialProducts = [
        { name: 'White Bread 500gm', quantity: '' },
        { name: 'White Bread 300gm', quantity: '' },
        { name: 'Milk Bread 300gm', quantity: '' },
        { name: 'Multigrain Bread 300gm', quantity: '' },
      ];
    
      const [products, setProducts] = useState(initialProducts);
    
      const handleChangeQuantity = (index, event) => {
        const newProducts = [...products];
        newProducts[index].quantity = event.target.value;
        setProducts(newProducts);
      };
    
      const handleKeyDown = (event, index) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          if (index < products.length - 1) {
            const nextInput = document.getElementById(`quantity-${index + 1}`);
            nextInput.focus();
          }
        }
      };    
      const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form submitted:', products);
        // Perform any other desired actions with the submitted data
      };
    return (
        <div>
        <form onSubmit={handleSubmit}>
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
        </form>
      </div>
    );
};

export default AddNewProducts;