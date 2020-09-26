import React from 'react';
import './FaceRecognition.css'


const FaceRecognition=({imageURL, box})=>{
    return(
           <div className='center ma'>
               <div className='absolute mt2'>
                   <img alt='' src={imageURL} id='inputImage' width='500px' height='auto' />
                   <div className='bounding-box' style={{top:box.toprow,right:box.rightcol,bottom:box.bottom,left:box.leftcol}}>
                   </div>
               </div>
           </div>
    );
}

export default FaceRecognition;

