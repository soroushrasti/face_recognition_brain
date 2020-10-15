import React from 'react';
import Tilt from 'react-tilt';
import brain from './face.png'
import './Logo.css'

const Logo=()=>{

    return(

       <div className='tc'>
       <Tilt className='Tilt shadow-3 mt0' style={{height:150, width:150}}>
        <div className='Tilt-inner'><img alt='logo' src={brain} /></div>
       </Tilt>
       </div>
    );
}

export default Logo;

