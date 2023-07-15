import React from 'react';
import { useForm } from 'react-hook-form';

const ShowExpiry = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  

    return (
        <div>
            <h2>show expiry</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Outelet Name" {...register("Outelet Name", {required: true})} />
      <br/>
      <input type="date" placeholder="Date From" {...register("Date From", {required: true})} />
      <input type="date" placeholder="Date To" {...register("Date To", {required: true})} />
      <br/>
      <input type="submit" />
    </form>
        </div>
    );
};

export default ShowExpiry;