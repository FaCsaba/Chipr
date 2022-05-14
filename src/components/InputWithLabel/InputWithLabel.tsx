import React from 'react';
import Classes from './InputWithLabel.module.css';

const InputWithLabel = React.forwardRef<HTMLInputElement, {className?: string, type: string, label: string, id: string}>((props, ref) => {
  return (
    <>
        <label htmlFor={props.id} className={Classes.Label}>{props.label}</label>
        <input type={props.type} required className={Classes.TextInput +' '+props.className} name={props.label} placeholder={props.label} id={props.id} ref={ref}/>
    </>
  )
})

export default InputWithLabel