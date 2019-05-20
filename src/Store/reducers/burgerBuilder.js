import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
const initialState = {
    ingredients: null,
    totalPrice: 25,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    salad: 10,
    cheese: 15,
    meat: 25,
    bacon: 30
  }

  const addIngredient = (state, action) => {
    const updateIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 } 
        const updateIngredients = updateObject(state.ingredients, updateIngredient)
        const updatedState = {
            ingredients: updateIngredients,
            totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
            building: true
        }
        return updateObject(state, updatedState)
  }

  const removeIngredient = (state, action) => {
    const updateIngredientRemove = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 } 
        const updateIngredientsRemove = updateObject(state.ingredients, updateIngredientRemove)
        const updatedStateRemove = {
            ingredients: updateIngredientsRemove,
            totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
            building: true
        }
        return updateObject(state, updatedStateRemove)
  }

  const setIngredient = (state, action) => {
    return updateObject(state,{
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 25,
        error: false,
        building: false
    })
  }

  const fetchIngerdientsFailed = (state, action) => {
    return updateObject(state, {
        error: true
    })
  }

const reducer = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:  return addIngredient(state, action)
        case actionTypes.REMOVE_INGREDIENT:  return removeIngredient(state, action)
        case actionTypes.SET_INGREDIENTS: return setIngredient(state,action)
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngerdientsFailed(state,action)
        default: return state
    }
}

export default reducer;