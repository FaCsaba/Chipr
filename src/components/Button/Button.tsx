import React from 'react';
import Classes from './Button.module.css' ;

interface ButtonI {
    value: string,
    type?: 'submit' | 'button',
    callback?: () => any
}

// Could be made into one function

function Primary({value, type='button', callback}: ButtonI): JSX.Element {
    return (
        <input type={type} className={Classes.Primary} value={value} onClick={callback} />
    )
}

function Secondary({value, type='button', callback}: ButtonI): JSX.Element {
    return (
        <input type={type} className={Classes.Secondary} value={value} onClick={callback} />
    )
}

const Button = {
    Primary,
    Secondary
}
    
export default Button