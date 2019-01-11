import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';
const controls = [
    { label: 'Salad', type: "salad"},
    { label: 'Bacon', type: "bacon"},
    { label: 'Meat', type: "meat"},
    { label: 'Cheese', type: "cheese"}
]

const BuildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
    <p>Current Price: <strong>&#8377; {props.price}</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
            key={ctrl.label} 
            label={ctrl.label}
            added = {() => props.ingredientAdded(ctrl.type)}
            removed = {() => props.ingredientRemoved(ctrl.type)}
            disable = { props.disabled[ctrl.type] }/>
        ))}
        <button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.purchase}>ORDER NOW</button>
    </div>
  )
}

export default BuildControls
