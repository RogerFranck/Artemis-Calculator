import React,{Component} from 'react';
import './App.css';
import Appbar from './Components/Appbar.js' 
import Operation from './Components/Operation.js' 

class App extends Component{
  render(){
    return(
      <div>
          <Appbar/>
          <Operation/>
      </div>
    );
  }
}

export default App;
