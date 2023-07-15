import React from 'react';
import { useForm } from 'react-hook-form';


const AddNewOutlet = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
    return (
        <div>
            <h2>add new outlet</h2>     
            <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Company Name" {...register("Company Name", {required: true})} />
      <br/>
      <input type="text" placeholder="Outlet Name" {...register("Outlet Name", {required: true})} />
            <br/>

      <input type="number" placeholder="GP" {...register("GP", {required: true})} />

      <input type="submit" />
    </form> 
        </div>
    );
};

export default AddNewOutlet;