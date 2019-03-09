import React, { Component } from 'react';
import { connect } from 'react-redux';
import Auxiliary from "../../hoc/Auxiliary";
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../Store/actions';


class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }
  componentDidMount () {
    // axios.get('https://burger-builder-9dc87.firebaseio.com/ingredients.json')
    // .then(response => {
    //   this.setState({ingredients: response.data})
    // })
    // .catch(error => {
    //   this.setState({error: true})
    // })
  }
  updatePurchaseState (ingredients){
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce((sum, el)=>{
        return sum + el;
      }, 0);
      return sum > 0
  }

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    })
  }
  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    })
  }
  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  }
  render() {
    const disabledInfo = {
      ...this.props.ings
    }
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    
    
    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />
    if(this.props.ings){
      burger = (
        <Auxiliary>
        { <Burger ingredients={this.props.ings}/>}
        <BuildControls 
        ingredientAdded = {this.props.onIngredientAdded}
        ingredientRemoved = {this.props.onIngredientRemoveded}
        disabled={disabledInfo}
        purchasable={this.updatePurchaseState(this.props.ings)}
        price={this.props.totalPrice}
        purchase={this.purchaseHandler}
        />
        </Auxiliary>
        ) 

        orderSummary = <OrderSummary 
    ingredients={this.props.ings}
    purchaseCanceled = {this.purchaseCancelHandler}
    purchaseContinued = {this.purchaseContinueHandler}
    totalPrice = {this.props.totalPrice}
    />
    }
    if(this.state.loading){
      orderSummary = <Spinner />
    }
    return (
        <Auxiliary>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
            {burger}
        </Auxiliary>
    )
  }
}
const mapStateToProps = state => {
  return{
    ings: state.ingredients,
    totalPrice: state.totalPrice
  }
}
const mapDispatchToProps = dispatch => {
  return{
    onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
    onIngredientRemoveded: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(BurgerBuilder);