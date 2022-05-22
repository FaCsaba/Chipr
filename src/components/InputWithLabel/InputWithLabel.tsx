import React from 'react';
import Classes from './InputWithLabel.module.css';

const InputWithLabel = React.forwardRef<HTMLInputElement, {className?: string, type: string, label: string, id: string, isRequired?: boolean, defaultValue?: string}>((props, ref) => {
  return (
    <>
        <label htmlFor={props.id} className={Classes.Label}>{props.label}</label>
        <input type={props.type} required={props.isRequired} defaultValue={props.defaultValue} className={Classes.TextInput +' '+props.className} name={props.label} placeholder={props.label} id={props.id} ref={ref}/>
    </>
  )
})

export default InputWithLabel