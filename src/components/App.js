import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import MovieCarousel from './MovieCarousel/MovieCarousel'

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

        //  <div className='movieCategoryRow'>
        //   <h3 className="rowHeader">Trending</h3>
        //   <div className="movieRow">
        //   <button 
        //     className="leftRowButton"
        //     onClick={() => this.moveRowLeft()}>Left</button>
        //   <div className="row">
        //     <div className="moviesCarousel" style={{marginLeft: `${this.state.leftMargin}px`}}>
        //       <MovieSlider movies={this.state.movies}/>
        //     </div>
        //   </div>
        //   <button 
        //     className="rightRowButton"
        //     onClick={() => this.moveRowRight()}>Right</button>
        //   </div>
        // </div>
        // <div className='movieCategoryRow'>
        //   <h3 className="rowHeader">Upcoming</h3>
        //   <div className="movieRow">
        //   <button 
        //     className="leftRowButton"
        //     onClick={() => this.moveRowLeft()}>Left</button>
        //   <div className="row">
        //     <div className="moviesCarousel" style={{marginLeft: `${this.state.leftMargin}px`}}>
        //       <MovieSlider movies={this.state.upcoming}/>
        //     </div>
        //   </div>
        //   <button 
        //     className="rightRowButton"
        //     onClick={() => this.moveRowRight()}>Right</button>
        //   </div>
        // </div>


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
        <MovieCarousel
          category={'Trending'}
          movies={this.state.movies} />
        <MovieCarousel
          category={'Upcoming'}
          movies={this.state.upcoming} />

      </div>
    );
  }
}

export default App;


