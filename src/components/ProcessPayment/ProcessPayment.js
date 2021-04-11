import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCardForm';

const stripePromise = loadStripe('pk_test_51IePRICl6oXYX2l0UymVoBbO6qqapKHPg8hJ0y4BerqgDrbHqeN0reNO724ClwxmRT3KIUANUv1ujpWRSIkPkUrn000gPNZQ2r');

const ProcessPayment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
            <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
        </Elements>
    );
};

export default ProcessPayment;