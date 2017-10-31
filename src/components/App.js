import React from 'react';
import {Route, Switch} from 'react-router-dom'
import './App.css';

import Navbar from './Navbar/Navbar'
import Home from './Home/Home'
import SearchResults from './SearchResults/SearchResults'
import ProgramDisplay from './ProgramDisplay/ProgramDisplay'

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/search" component={SearchResults} />
        <Route path="/movie/:id" component={ProgramDisplay} />
        <Route path="/tv/:id" component={ProgramDisplay} />
      </Switch>
    </div>
  )
}

export default App;


