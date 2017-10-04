import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import MovieSlider from './MovieSlider/MovieSlider'

import {getPopularMovies, getUpcomingMovies} from '../services/movieLists'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      upcoming: []
    }
  }

  componentWillMount() {
    getPopularMovies().then(response => {
      this.setState({
        movies: response
      })
    })
    getUpcomingMovies().then(response => {
      this.setState({
        upcoming: response
      })
    })
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className='movieCategoryList'>
          <h3>Trending</h3>
          <div className="row">
            <div className="moviesCarousel">
              <MovieSlider movies={this.state.movies}/>
            </div>
          </div>
        </div>
        <div className='movieCategoryList'>
          <h3>Upcoming</h3>
          <div className="row">
            <div className="moviesCarousel">
              <MovieSlider movies={this.state.upcoming}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
