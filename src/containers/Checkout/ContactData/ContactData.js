import React, { Component } from 'react';
import {connect} from 'react-redux'; 
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import { updateObject } from '../../../Store/utility';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.module.css';
import * as actions from '../../../Store/actions/index';
class ContactData extends Component {
    state = {
        orderForm: {
          name: {
            elementType: 'input',
            elementConfig: {
              type: "text",
              placeholder: "Your Name"
            },
            value: "",
            validation: {
              required: true
            },
            valid: false,
            touched: false
          },

          street: {
            elementType: 'input',
            elementConfig: {
              type: "text",
              placeholder: "Street"
            },
            value: "",
            validation: {
              required: true
            },
            valid: false,
            touched: false
          },
          zipCode: {
            elementType: 'input',
            elementConfig: {
              type: "text",
              placeholder: "zip code"
            },
            value: "",
            validation: {
              required: true,
              minLength: 5,
              maxLength: 6
            },
            valid: false,
            touched: false
          },
          country: {
            elementType: 'input',
            elementConfig: {
              type: "text",
              placeholder: "country"
            },
            value: "",
            validation: {
              required: true
            },
            valid: false,
            touched: false
          } ,
          email: {
            elementType: 'input',
            elementConfig: {
              type: "email",
              placeholder: "Email"
            },
            value: "",
            validation: {
              required: true
            },
            valid: false,
            touched: false
          },
          deliveryMethod: {
            elementType: 'select',
            elementConfig: {
              options: [
                {value: "fastest", displayValue: "Fastest"},
                {value: "cheapest", displayValue: "Cheapest"}
              ]
            },
            value: "fastest",
            validation: {},
            valid: true
          }
        },
        formIsValid: false
    }
    orderHandler = (event) => { 
        event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm){
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId
    }
    this.props.onOrderBurger(order, this.props.token)
 
    }

    checkValidity(value, rule){
      let isValid = true;
      if(rule.required) {
        isValid = value.trim() !== '' && isValid;
      }
      if(rule.minLength ){
        isValid = value.length >= rule.minLength && isValid
      }
      if(rule.maxLength){
        isValid = value.length <= rule.maxLength && isValid
      }
      return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
      
      const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier],{
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
        touched: true
      })
      const updatedOrderForm = updateObject(this.state.orderForm, {
        [inputIdentifier]: updatedFormElement
      }) 
      let formIsValid = true;
      for(let inputIdentifiers in updatedOrderForm) {
        formIsValid = updatedOrderForm[inputIdentifiers].valid && formIsValid;
 
      }
      this.setState({
        orderForm: updatedOrderForm,
        formIsValid: formIsValid
      })
    }
  render() {
      const formElementArray = [];
      for (let key in this.state.orderForm){
        formElementArray.push({
          id: key,
          config: this.state.orderForm[key]
        })
      }
      let form = (
        <form onSubmit={this.orderHandler}>
        {formElementArray.map(formElement => (
          <Input 
          key={formElement.id}
          elementType={formElement.config.elementType} 
          elementConfig={formElement.config.elementConfig} 
          value={formElement.config.value}
          inValid = {!formElement.config.valid}
          touched = {formElement.config.touched}
          shouldValidate = {formElement.config.validation}
          changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
    </form>
      );
      if(this.props.loading){
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

const mapStateToProps = state => {
  return{
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}
const mapDispatchToProps = dispatch => {
  return{
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
  }
}
  

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);