import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';

import {getPopularMovies} from '../services/movieLists'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: ['Movie 1', 'Movie 2', 'Movie 3']
    }
  }

  componentWillMount() {
    getPopular().then(response => {
      this.setState({
        movies: response
      })
    })
  }

  render() {
    const movies = this.state.movies.map(movie => {
      return (
        <div>{movie}</div>
      )
    })
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {movies}
      </div>
    );
  }
}

export default App;
