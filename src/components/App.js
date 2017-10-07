import React, { Component } from 'react';
import './App.css';
import MovieCarousel from './MovieCarousel/MovieCarousel'

import {
  getPopularMovies, getUpcomingMovies, getTopFantasyMovies, 
  getTopComedyMovies, getTopHorrorMovies, getTopMysteryMovies} from '../services/movieLists'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      upcoming: [],
      fantasy: [],
      comedy: [],
      horror: [],
      mystery: []
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
    getTopFantasyMovies().then(response => {
      this.setState({
        fantasy: response
      })
    })
    getTopComedyMovies().then(response => {
      this.setState({
        comedy: response
      })
    })
    getTopHorrorMovies().then(response => {
      this.setState({
        horror: response
      })
    })
    getTopMysteryMovies().then(response => {
      this.setState({
        mystery: response
      })
    })
  }


  render() {
    let topMovie;
    if(this.state.movies) {
      topMovie = this.state.upcoming[1]
    } 

    return topMovie ? (
      <div className="App">
        <div style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1280${topMovie.backdrop_path})`}} className="hero">
          <div className="hero_overlay">
            <h1 className="hero_title">
              {topMovie.title}
            </h1>
          </div>
        </div>
        <div className="moviesContainer">
          <MovieCarousel
            category={'Trending'}
            movies={this.state.movies} />
          <MovieCarousel
            category={'Upcoming'}
            movies={this.state.upcoming} />
          <MovieCarousel
            category={'Fantasy'}
            movies={this.state.fantasy} />
          <MovieCarousel
            category={'Comedy'}
            movies={this.state.comedy} />
          <MovieCarousel
            category={'Horror'}
            movies={this.state.horror} />
          <MovieCarousel
            category={'Mystery'}
            movies={this.state.mystery} />
        </div>
      </div>
    )
    : 'Loading'
  }
}

export default App;


