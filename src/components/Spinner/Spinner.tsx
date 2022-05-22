import React from 'react';
import {CgSpinnerAlt} from 'react-icons/cg';
import Classes from './Spinner.module.css';

function Spinner({className}: {className?: string}) {
    return (
        <CgSpinnerAlt className={className+' '+Classes.Spinner}/>
    )
}

export default Spinner