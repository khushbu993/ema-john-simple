import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import './Shipment.css';

const Shipment = () => {
  const [loggedInUser] = useContext(userContext);
  const { register, handleSubmit, watch, errors } = useForm();
  const [shippingData, setShippingData] = useState(null);
  
  const onSubmit = data => {
    setShippingData(data);
  };

  const handlePaymentSuccess = paymentId => {
    // console.log('form submitted', data)
    const saveCart = getDatabaseCart();
    const orderDetail = { 
      ...loggedInUser, 
      products: saveCart, 
      shipment: shippingData, 
      paymentId,
      orderTime: new Date() 
    };

    fetch('https://limitless-tundra-96054.herokuapp.com/addOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderDetail)
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          processOrder();
          alert('Your Order placed successfully');
        }
      })
  }

  console.log(watch("example"));
  return (
    <div className="row">
      <div style={{display: shippingData ? 'none' : 'block'}} className="col-md-6">
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>

          <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your Name" />
          {errors.name && <span className="error">Name is required</span>}

          <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your Email" />
          {errors.email && <span className="error">Email is required</span>}

          <input name="address" ref={register({ required: true })} placeholder="Your Address" />
          {errors.address && <span className="error">Address is required</span>}

          <input name="phone" ref={register({ required: true })} placeholder="Your Phone No" />
          {errors.phone && <span className="error">Phone Number is required</span>}

          <input type="submit" />
        </form>
      </div>
      <div style={{display: shippingData ? 'block' : 'none'}} className="col-md-6">
        <h2>Your Payment Method:</h2>
        <ProcessPayment handlePayment = {handlePaymentSuccess}></ProcessPayment>
      </div>
    </div>
  );
};

export default Shipment;