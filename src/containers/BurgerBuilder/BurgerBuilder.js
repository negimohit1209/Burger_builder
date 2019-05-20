import React, { Component } from 'react';
import { connect } from 'react-redux';
import Auxiliary from "../../hoc/Auxiliary";
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as Actions from '../../Store/actions/index';


class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false,
  }
  componentDidMount () {
    this.props.onInitIngredients();
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
    if(this.props.isAuthenticated){
      this.setState({
        purchasing: true
      })
    }else{
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
    
  }
  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    })
  }
  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
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
    
    
    let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />
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
        isAuth = {this.props.isAuthenticated}
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
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  }
}
const mapDispatchToProps = dispatch => {
  return{
    onIngredientAdded: (ingName) => dispatch(Actions.addIngredient(ingName)),
    onIngredientRemoveded: (ingName) => dispatch(Actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(Actions.initIngredients()),
    onInitPurchase: () => dispatch(Actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(Actions.setAuthRedirectPath(path))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(BurgerBuilder);