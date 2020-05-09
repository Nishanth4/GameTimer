import React, { useState, useEffect } from 'react';


const Time = ({ recievedClick }) => {

  const [counter, setCounter] = useState(60);
  const [isActive, setIsActive] = useState(true);

  const toggle = () => {//toggles the isActive boolean
    setIsActive(!isActive);
  }

  useEffect(() => {//This use effect is for when the counter and isActive changes
    const timer =
      counter > 0 && isActive === true && setTimeout(() => setCounter(counter - 1), 1000);
      
  }, [counter, isActive]);

  useEffect(() => {
    recievedClick(isActive, counter);//sending back data to parent when button pressed
  }, [isActive]);

  return (
  <div>
      <h1>How much time?</h1>
      <input className="timeInput" type="number"  onChange={(event) => setCounter(event.target.value)}></input>
      <h3>Time: { counter }</h3>
      <button className="stop-button" onClick = { toggle }>{ isActive ? 'STOP' : 'START'}</button>
    </div>
     );
  
}

export default Time;