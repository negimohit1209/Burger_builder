import React from 'react';
import Auxilary from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map((igKey) => {
            return (<li key={igKey}>
                <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
            </li>)
        });
    return (
        <Auxilary>
            <h3>Your Order:</h3>
            <p>A delicious burger with following content.</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total:  &#8377;{props.totalPrice}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Auxilary>
    )
}

export default OrderSummary;
