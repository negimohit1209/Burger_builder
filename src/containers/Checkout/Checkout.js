import React, { Component } from 'react';
import {connect} from 'react-redux';
import CheckoutSummary from '../../components/order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
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
        ingredients={this.props.ingredients}
        onCheckoutCancel={this.checkoutCancelledHandler}
        onCheckoutContinue={this.checkoutContinueHandler}
        />
      <Route 
        path={this.props.match.path + '/contact-data'}
        component={ContactData}
      />
      </div>
    )
  }
}
const mapStateToProps = state => {
  return{
    ingredients: state.ingredients
  }
  
}
export default connect(mapStateToProps)(Checkout);
