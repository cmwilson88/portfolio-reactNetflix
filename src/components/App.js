import React, { Component } from 'react';
import './App.css';

import Navbar from './Navbar/Navbar'
import Home from './Home/Home'

class App extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div className="App">
        <Navbar/>
        <Home />
      </div>
    )
  }
}

export default App;


