import React, { Component } from 'react';
import {connect} from 'react-redux';
import CheckoutSummary from '../../components/order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import * as actions from '../../Store/actions/index';
class Checkout extends Component {
    checkoutCancelledHandler = () => {
      this.props.history.goBack();
    }
    checkoutContinueHandler = () => {
      this.props.history.replace('/checkout/contact-data');
    }
  render() {
    let summary = <Redirect to="/"/>
    
    if (this.props.ingredients){
      const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null
      summary = (
      <div>
      {purchasedRedirect}
      <CheckoutSummary 
      ingredients={this.props.ingredients}
      onCheckoutCancel={this.checkoutCancelledHandler}
      onCheckoutContinue={this.checkoutContinueHandler}
      />
      <Route 
      path={this.props.match.path + '/contact-data'}
      component={ContactData}
    />
      </div>)
    }
    return summary
  }
}
const mapStateToProps = state => {
  return{
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }
}


export default connect(mapStateToProps)(Checkout);
