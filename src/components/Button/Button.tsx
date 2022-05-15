import Classes from './Button.module.css' ;
import { BsPlusLg } from 'react-icons/bs'

interface ButtonI {
    value?: string,
    type?: 'submit' | 'button',
    callback?: () => any,
    className?: string
}

interface CreateButtonI {
    callback: () => void
    isCreating: boolean,
}

// Could be made into one function

function Primary({value, type='button', callback, className}: ButtonI): JSX.Element {
    return (
        <input type={type} className={Classes.Primary+' '+className} value={value} onClick={callback} />
    )
}

function Secondary({value, type='button', callback, className}: ButtonI): JSX.Element {
    return (
        <input type={type} className={Classes.Secondary+' '+className} value={value} onClick={callback} />
    )
}

function Create({callback, isCreating}: CreateButtonI): JSX.Element {


    return (
        <BsPlusLg type='button' onClick={callback} className={Classes.Create + ' ' + (isCreating? Classes.Active : ' ')} tabIndex={0}/>
    )   
}

const Button = {
    Primary,
    Secondary,
    Create
}
    
export default Button