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
const INGREDIENT_PRICES = {
  salad: 10,
  cheese: 15,
  meat: 25,
  bacon: 30
}

class BurgerBuilder extends Component {
  state = {
    totalPrice: 25,
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
      this.setState({purchasable: sum > 0});
  }

  addIngredientHandler = (type) => {
    const oldCount = this.props.ings[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.props.ings[type];
    if(oldCount <= 0){
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchaseState(updatedIngredients);
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
    // alert("you continue");
    
    const queryparams = [];
    for(let i in this.state.ingredients) {
      queryparams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
      queryparams.push('price='+ this.state.totalPrice);
    const queryString = queryparams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
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
        purchasable={this.state.purchasable}
        price={this.state.totalPrice}
        purchase={this.purchaseHandler}
        />
        </Auxiliary>
        ) 

        orderSummary = <OrderSummary 
    ingredients={this.props.ings}
    purchaseCanceled = {this.purchaseCancelHandler}
    purchaseContinued = {this.purchaseContinueHandler}
    totalPrice = {this.state.totalPrice}
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
    ings: state.ingredients
  }
}
const mapDispatchToProps = dispatch => {
  return{
    onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
    onIngredientRemoveded: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(BurgerBuilder);