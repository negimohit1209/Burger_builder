import React from 'react';
import classes from './Button.module.css';

const Button = (props) => {
  return (
    <button
        onClick={props.clicked} 
        disabled={props.disabled}
        className={[classes.Button, classes[props.btnType]].join(" ")}>
        {props.children}
    </button>
  )
}

export default Button;
