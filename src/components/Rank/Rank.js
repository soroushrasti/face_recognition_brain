import React from 'react';


const Rank=({name,entries})=>{

    return(
<div>
    <div className='white f3'>
     {`Dear ${name}, your rank in my database in accordance to the number of requested face detection is:`}
    </div>
    <div className='white f1'>
     {entries}
    </div>
</div>
    );
}

export default Rank;

