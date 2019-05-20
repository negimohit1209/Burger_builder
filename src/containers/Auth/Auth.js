import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import {connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as actions from '../../Store/actions/index';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                  type: "email",
                  placeholder: "Mail address"
                },
                value: "",
                validation: {
                  required: true,
                  isEmail: true
                },
                valid: false,
                touched: false
              },
            password : {
                elementType: 'input',
                elementConfig: {
                  type: "password",
                  placeholder: "password"
                },
                value: "",
                validation: {
                  required: true,
                  minLength: 6
                },
                valid: false,
                touched: false
              },
        },
        isSignup: true
    }
    componentDidMount() {
      if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
        this.props.onSetAuthRedirectPath();
      }
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

    inputChangedHandler = (event, controlName) => {
      const updatedControls = {
        ...this.state.controls,
        [controlName]: {
          ...this.state.controls[controlName],
          value: event.target.value,
          valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
          touched: true
        }
      };
      this.setState({controls: updatedControls})
    }

    submitHandler = (event) => {
      event.preventDefault();
      this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
    }

    switchAuthModeHandler = () => {
      this.setState(prevState => {
        return {isSignup: !prevState.isSignup}
      });
    }
  render() {
    const formElementArray = [];
    for (let key in this.state.controls){
      formElementArray.push({
        id: key,
        config: this.state.controls[key]
      })
    }

    let form = formElementArray.map((formElement) => (
      <Input 
        key = {formElement.id}
        elementType={formElement.config.elementType} 
          elementConfig={formElement.config.elementConfig} 
          value={formElement.config.value}
          inValid = {!formElement.config.valid}
          touched = {formElement.config.touched}
          shouldValidate = {formElement.config.validation}
          changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />
    )) 
    if(this.props.loading){
      form = <Spinner />  
    }
    let errorMessage = null;
    if(this.props.error) {
        errorMessage = (
          <p>{this.props.error.message}</p>
        )
    }
    let authRedirect = null;
    if(this.props.isAuthenticated){

      authRedirect = <Redirect to={this.props.authRedirectPath}/>
    }
    return (
      <div className={classes.Auth}>
      {authRedirect}
      {errorMessage}
        <form onSubmit={this.submitHandler}>
        {form}
        <Button btnType="Success">Submit</Button>
        </form>
        <Button 
          btnType="Danger" 
          clicked = {this.switchAuthModeHandler}
          >Switch to 
          {this.state.isSignup ? " SIGNIN" : " SIGNUP"} </Button>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return{
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onAuth: (email, password,isSignup) => dispatch(actions.auth(email,password,isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);