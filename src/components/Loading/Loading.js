import React from 'react';
import { ScaleLoader } from 'react-spinners';
import './Loading.css'

const Loading = () => {
    return (
        <section className='loadingMain d-flex justify-content-center align-items-center' >
            <ScaleLoader
                color="#36d7b7"
                height={50}
                width={10}
                radius={5}
                loading
                speedMultiplier={1}
                    />
                    <p></p>
        </section>
    );
};

export default Loading;