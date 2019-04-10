import React, { Component } from 'react'
import Order from '../../components/order/Order';
import axios from '../../axios-orders';
import * as actions from '../../Store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

  componentDidMount() {
    this.props.onFetchOrders()
  }
  render() {
    let orders = <Spinner />
    if(!this.props.loading){
      orders = this.props.orders.map(order => (
          <Order 
          key={order.id} 
          ingredients={order.ingredients}
          price={order.price}
          />
        )) 
    }
    return (
      <div>
         {orders} 
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    orders: state.order.orders,
    loading: state.order.loading
  }
}
const mapDispatchToProps = dispatch => {
  return{
    onFetchOrders: () => dispatch(actions.fetchOrders())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);