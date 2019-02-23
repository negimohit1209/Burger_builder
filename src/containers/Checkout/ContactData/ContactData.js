import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
export default class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({
      loading: true
    })
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Mohit Negi",
        address: {
          street: 'b garden street',
          zipCode: "323307",
          country: "India",
        },
        email: "test@test.com"
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(res => {  
        this.setState({loading: false });
        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({loading: false })
      });
    }
  render() {
      let form = (
        <form>
        <input className={classes.Input} type='text' name="name" placeholder="Your Name"/>
        <input className={classes.Input} type='email' name="name" placeholder="Your Email"/>
        <input className={classes.Input} type='text' name="street" placeholder="Street"/>
        <input className={classes.Input} type='text' name="postal" placeholder="Postal Code"/>
        <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
    </form>
      );
      if(this.state.loading){
          form = <Spinner/>
      }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact details.</h4>
        {form}
      </div>
    )
  }
}
