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
            value: ""
          },

          street: {
            elementType: 'input',
            elementConfig: {
              type: "text",
              placeholder: "Street"
            },
            value: ""
          },
          zipCode: {
            elementType: 'input',
            elementConfig: {
              type: "text",
              placeholder: "zip code"
            },
            value: ""
          },
          country: {
            elementType: 'input',
            elementConfig: {
              type: "text",
              placeholder: "country"
            },
            value: ""
          } ,
          email: {
            elementType: 'input',
            elementConfig: {
              type: "email",
              placeholder: "Email"
            },
            value: ""
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
    const order = {}
    axios.post('/orders.json', order)
      .then(res => {  
        this.setState({loading: false });
        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({loading: false })
      });
    }

    inputChangedHandler = (event, inputIdentifier) => {
      const updatedOrderForm = {
        ...this.state.orderForm
      }
      const updatedFormElement = {
        ...updatedOrderForm[inputIdentifier]
      }
      updatedFormElement.value = event.target.value;
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
        <form>
        {formElementArray.map(formElement => (
          <Input 
          key={formElement.id}
          elementType={formElement.config.elementType} 
          elementConfig={formElement.config.elementConfig} 
          value={formElement.config.value}
          changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
        ))}
        <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
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
