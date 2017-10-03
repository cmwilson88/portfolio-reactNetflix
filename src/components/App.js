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
    // const movies = this.state.movies.map((movie, index) => {
    //   return (
    //     <div className="testMovie" key={index} style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`}}></div>
    //   )
    // })
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
            <MovieSlider movies={this.state.movies}/>
        </div>
        <div className='movieCategoryList'>
          <h3>Upcoming</h3>
            <MovieSlider movies={this.state.upcoming}/>
        </div>
      </div>
    );
  }
}

export default App;
