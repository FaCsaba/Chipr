import Classes from './Button.module.css' ;
import { BsPlusLg } from 'react-icons/bs';
import {AiFillPicture} from 'react-icons/ai';

interface ButtonI {
    value?: string
    type?: 'submit' | 'button'
    onClick?: () => void
    className?: string
}

interface CreateButtonI {
    onClick: () => void
    isCreating: boolean
}

// Could be made into one function

function Primary({value, type='button', onClick, className}: ButtonI): JSX.Element {
    return (
        <input type={type} className={Classes.Primary+' '+className} value={value} onClick={onClick} />
    )
}

function Secondary({value, type='button', onClick, className}: ButtonI): JSX.Element {
    return (
        <input type={type} className={Classes.Secondary+' '+className} value={value} onClick={onClick} />
    )
}

function Create({onClick, isCreating}: CreateButtonI): JSX.Element {


    return (
        <BsPlusLg type='button' onClick={onClick} className={Classes.Create + ' ' + (isCreating? Classes.Active : ' ')} tabIndex={0}/>
    )   
}

function Picture({onClick, className}: ButtonI) {
    return (
        <AiFillPicture type='button' onClick={onClick} className={Classes.Picture+' '+className}/>
    )
}

const Button = {
    Primary,
    Secondary,
    Create,
    Picture
}
    
export default Button