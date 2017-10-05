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
      upcoming: [],
      leftMargin: -400
    }

    this.moveRowRight = this.moveRowRight.bind(this)
    this.moveRowLeft = this.moveRowLeft.bind(this)
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

  moveRowRight() {
    let newMargin = this.state.leftMargin - 400
    this.setState({
      leftMargin: newMargin
    })
  }

  moveRowLeft() {
    let newMargin = this.state.leftMargin + 400
    if(newMargin > 0) {
      newMargin = 0
    }
    this.setState({
      leftMargin: newMargin
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
            <button onClick={() => this.moveRowLeft()}>Left</button>
            <div className="moviesCarousel" style={{marginLeft: `${this.state.leftMargin}px`}}>
              <MovieSlider movies={this.state.movies}/>
            </div>
            <button onClick={() => this.moveRowRight()}>Right</button>
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
