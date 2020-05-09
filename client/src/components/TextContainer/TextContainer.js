import React from 'react';

const TextContainer = ({ users }) => (
    <div className="textContainer">
      <div>
        <h1>Realtimer</h1>
      </div>
      {
        users
          ? (
            <div>
              <h1>People currently Timing:</h1>
              <div className="activeContainer">
                <h2>
                  {users.map(({name}) => (
                    <div key={name} className="activeItem">
                      {name}
                    </div>
                  ))}
                </h2>
              </div>
            </div>
          )
          : null
      }
    </div>
  );
  
  export default TextContainer;