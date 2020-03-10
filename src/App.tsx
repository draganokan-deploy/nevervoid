import React from 'react';
import {Counter} from './Counter'
import {Input} from './Input'
import { Randomizer } from './Randomizer';

const CompoWrapper: React.FC = ({children}) => {
  return <div style={{border: "1px solid grey", padding: "20px", margin: "20px"}}>{children}</div>
}

function App() {

  return (
    <div className="App">
      <h1>nevervoid</h1>
      <CompoWrapper>
        <Counter />
      </CompoWrapper>
      <CompoWrapper>
        <Input />
      </CompoWrapper>
      <CompoWrapper>
        <Randomizer />
      </CompoWrapper>
    </div>
  );
}

export default App;
