import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom'
import './App.css';

import Navbar from './Navbar/Navbar'
import Home from './Home/Home'
import SearchResults from './SearchResults/SearchResults'

class App extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div className="App">
        <Navbar/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/search" component={SearchResults} />
        </Switch>
      </div>
    )
  }
}

export default App;


