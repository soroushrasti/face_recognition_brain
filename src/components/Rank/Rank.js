import React from 'react';


const Rank=({name,entries})=>{

    return(
<div>
    <div className='white f3'>
     {`Dear ${name}, your rank in my database in accordance to the number of times you have requested face detection:`}
    </div>
    <div className='white f1'>
     {entries}
    </div>
</div>
    );
}

export default Rank;

