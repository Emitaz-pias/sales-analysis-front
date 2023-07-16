import React from 'react';
import { useForm } from 'react-hook-form';




const ShowProjection = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  

    return (
        <div>
          <h2>show Projection here</h2>  
          <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Outelet Name" {...register("Outelet Name", {required: true})} />

      <input type="submit" />
    </form>
        </div>
    );
};

export default ShowProjection;