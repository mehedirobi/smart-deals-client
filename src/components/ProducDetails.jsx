import React from 'react';
import { useLoaderData } from 'react-router';

const ProducDetails = () => {
    const product = useLoaderData()
    console.log(product)
    return (
        <div>
            Details
        </div>
    );
};

export default ProducDetails;