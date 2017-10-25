import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import MovieCarousel from './MovieCarousel/MovieCarousel'

import {
  getPopularMovies, getUpcomingMovies, getMoviesByCategory, getTopFantasyMovies, 
  getTopComedyMovies, getTopHorrorMovies, getTopMysteryMovies} from '../../services/movieLists'

export default class Home extends Component {
	constructor(props) {
		super(props)

	    this.state = {
	      popular: [],
	      upcoming: [],
	      fantasy: [],
	      comedy: [],
	      horror: [],
	      mystery: [],
		  categories: [
	      	{type: 'movie', category: 'fantasy', id: 878},
	      	{type: 'movie', category: 'comedy', id: 35},
	      	{type: 'movie', category: 'horror', id: 27},
	      	{type: 'movie', category: 'mystery', id: 9648}
	      ],
	      ready: false
	    }
	}


  componentWillMount() {
    getPopularMovies().then(response => {
      this.setState({
        popular: response
      })
    })
    getUpcomingMovies().then(response => {
      this.setState({
        upcoming: response
      })
    })

    for (let category of this.state.categories) {
    	getMoviesByCategory(category.id).then(response => {
    		this.setState({
    			[category.category]: response
    		})
    	})
    }

    this.setState({
    	ready: true
    })
    // getTopFantasyMovies().then(response => {
    //   this.setState({
    //     fantasy: response
    //   })
    // })
    // getTopComedyMovies().then(response => {
    //   this.setState({
    //     comedy: response
    //   })
    // })
    // getTopHorrorMovies().then(response => {
    //   this.setState({
    //     horror: response
    //   })
    // })
    // getTopMysteryMovies().then(response => {
    //   this.setState({
    //     mystery: response
    //   })
    // })
  }

  render() {
    let topMovie;
    if(this.state.upcoming) {
      topMovie = this.state.upcoming[1]
    } 

    return this.state.ready ? (
    	<div>
    		
	    	<div 
	          className="hero"
	          style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1280${topMovie.backdrop_path})`}} >
	          <div className="hero_overlay">
	            <h1 className="hero_title">
	              {topMovie.title}
	            </h1>
	            <div className="hero_buttons">
	              <Link className="video_link" to={`/${topMovie.id}`}>
		              <div className="hero_play">
		                <i className="fa fa-play"></i>
		                Play
		              </div>
	              </Link>
	              <div className="hero_add">
	                <i className="fa fa-plus"></i>
	                My List
	              </div>
	            </div>
	            <p className="hero_description">
	              {topMovie.overview}
	            </p>
	          </div>
	        </div>
	        <div className="moviesContainer">
	          <MovieCarousel
	            category={'Trending'}
	            movies={this.state.popular} />
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
    ) : 'Loading'
  }

}