import React, { Component } from 'react'
import CheckoutSummary from '../../components/order/CheckoutSummary/CheckoutSummary';
export default class Checkout extends Component {
    state  = {
        ingredients:{
          salad: 1,
          meat: 1,
          cheese: 1,
          bacon: 1
        }
    }
  render() {
    return (
      <div>
        <CheckoutSummary ingredients={this.state.ingredients}/>
      </div>
    )
  }
}
