//dans App.js
import React, { useState } from 'react';

function App() {

  // Déclaration du state avec useState
  const [count, setCount] = useState(0);

  // Fonction pour incrémenter le compteur
  const increment = () => {
    setCount(count + 1);
  };


  // Fonction pour incrémenter le compteur
  const decrement = () => {
   
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <>
      <h1>Compteur : {count}</h1>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </>
  );
}

export default App;
