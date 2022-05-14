import React from 'react';
import {CgSpinnerAlt} from 'react-icons/cg';
import Classes from './Spinner.module.css';

function Spinner() {
  return (
      <div className={Classes.SpinnerContainer}>
          <CgSpinnerAlt className={Classes.Spinner} color='#7b39ed'/>
      </div>
  )
}

export default Spinner