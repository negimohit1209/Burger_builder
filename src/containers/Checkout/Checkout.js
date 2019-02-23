import React, { Component } from 'react'
import CheckoutSummary from '../../components/order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
export default class Checkout extends Component {
    state  = {
        ingredients:{},
        totalPrice: 0
    }
    componentDidMount() {
      const query = new URLSearchParams(this.props.location.search);
      const ingredients = {}
      let price = 0;
      for (let param of query.entries()){
        if(param[0] === 'price'){
          price = param[1];
        }else{
          ingredients[param[0]] = +param[1]
        }
      }
      this.setState({
        ingredients: ingredients,
        totalPrice: price
      })
    }
    checkoutCancelledHandler = () => {
      this.props.history.goBack();
    }
    checkoutContinueHandler = () => {
      this.props.history.replace('/checkout/contact-data');
    }
  render() {
    return (
      <div>
        <CheckoutSummary 
        ingredients={this.state.ingredients}
        onCheckoutCancel={this.checkoutCancelledHandler}
        onCheckoutContinue={this.checkoutContinueHandler}
        />
      <Route 
        path={this.props.match.path + '/contact-data'} 
        render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}
      />
      </div>
    )
  }
}
