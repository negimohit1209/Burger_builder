import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.module.css';
export default class ContactData extends Component {
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
            valid: false
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
            valid: false
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
            valid: false
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
            valid: false
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
            valid: false
          },
          deliveryMethod: {
            elementType: 'select',
            elementConfig: {
              options: [
                {value: "fastest", displayValue: "Fastest"},
                {value: "cheapest", displayValue: "Cheapest"}
              ]
            },
            value: ""
          }
        },
        loading: false
    }
    orderHandler = (event) => { 
        event.preventDefault();
        this.setState({
      loading: true
    })
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm){
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    }
    console.log(order);
    axios.post('/orders.json', order)
      .then(res => {  
        this.setState({loading: false });
        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({loading: false })
      });
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
      return isValid
    }

    inputChangedHandler = (event, inputIdentifier) => {
      const updatedOrderForm = {
        ...this.state.orderForm
      }
      const updatedFormElement = {
        ...updatedOrderForm[inputIdentifier]
      }
      updatedFormElement.value = event.target.value;
      updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
      console.log(updatedFormElement);
      updatedOrderForm[inputIdentifier] = updatedFormElement;
      this.setState({
        orderForm: updatedOrderForm
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
          changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
        ))}
        <Button btnType="Success" >Order</Button>
    </form>
      );
      if(this.state.loading){
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
