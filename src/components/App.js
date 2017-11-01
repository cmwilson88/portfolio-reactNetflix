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
      {/* Navbar always present.  CSS Styling will hide it when viewing videos */}
      <Navbar/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/search" component={SearchResults} />
        {/* 
            ProgramDisplay component displays an 100% browser iFrame with a video
            of the TV show or movie
         */}
        <Route path="/movie/:id" component={ProgramDisplay} />
        <Route path="/tv/:id" component={ProgramDisplay} />
      </Switch>
    </div>
  )
}

export default App;


