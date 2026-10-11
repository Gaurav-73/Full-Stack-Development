
import React, { useState } from 'react';
import './App.css';


function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  return (
    <div>
      <center> 
      <h2>Counter: {count}</h2>

      <button onClick={() => setCount(count + 1)}>
        Increment BY 1
      </button>
<br /><br />
      <button onClick={() => setCount(0)}>
        Reset
      </button>

      <br /><br />

      <input
        type="text"
        placeholder="Enter text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <p>Entered text: {text}</p>

       <button onClick={() => setText('')}>
        Reset Text
      </button>

      </center>
    </div>
  );
}

export default App;
