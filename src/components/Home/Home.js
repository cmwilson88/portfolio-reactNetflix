import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import MovieCarousel from './MovieCarousel/MovieCarousel'

import {
  getPopularMovies, 
  getUpcomingMovies, 
  getMoviesByCategory} from '../../services/movieLists'

export default class Home extends Component {
	constructor(props) {
		super(props)

	    this.state = {
	      popular: {
	      	format: 'movie',
	      	titles: []
	      },
	      upcoming: {
	      	format: 'movie',
	      	titles: []
	      },
		  categories: [
	      	{format: 'movie', type: 'genre', category: 'fantasy', id: 878},
	      	{format: 'movie', type: 'genre', category: 'comedy', id: 35},
	      	{format: 'movie', type: 'genre', category: 'horror', id: 27},
	      	{format: 'movie', type: 'genre', category: 'mystery', id: 9648},
	      	{format: 'tv', type: 'network', category: 'netflix', id: 213},
	      	{format: 'tv', type: 'network', category: 'hbo', id: 49}
	      ],
	      ready: false
	    }
	}


  componentWillMount() {
    getPopularMovies().then(response => {
      this.setState({
        popular: Object.assign(
        			{}, 
        			this.state.popular, 
        			{
        				titles: response
        			})
      })
    })
    getUpcomingMovies().then(response => {
      this.setState({
        upcoming: Object.assign(
        			{},
        			this.state.upcoming,
        			{
        				titles: response
        			}
        			)
      })
    })

    for (let i = 0, j=this.state.categories.length; i < j; i++) {
    	let item = this.state.categories[i]
    	if(i === j-1) {
    		getMoviesByCategory(item.format, item.type, item.id).then(response => {
    			this.setState({
    				[item.category]: {
    									format: item.format,
										titles: response
    								}
    			})
    			setTimeout(() => {
    				this.setState({
    					ready: true
    				})
    			}, 100)
    		})
    	} else {
	    	getMoviesByCategory(item.format, item.type, item.id).then(response => {
    			this.setState({
    				[item.category]:{
    									format: item.format,
    									titles: response
    								}
    			})
	    	})
    	}
    }
  }

  render() {
    let topMovie;
    if(this.state.netflix) {
      topMovie = this.state.hbo.titles[0]
    } 

    return this.state.ready ? (
    	<div>
	    	<div 
	          className="hero"
	          style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1280${topMovie.backdrop_path})`}} >
	          <div className="hero_overlay">
	            <h1 className="hero_title">
	              {topMovie.title || topMovie.name}
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
	          	category={'Netflix'}
	          	format={'tv'}
	          	movies={this.state.netflix.titles} />
			  <MovieCarousel
	          	category={'HBO'}
	          	format={'tv'}
	          	movies={this.state.hbo.titles} />
	          <MovieCarousel
	            category={'Trending'}
	            format={'tv'}
	            movies={this.state.popular.titles} />
	          <MovieCarousel
	            category={'Upcoming'}
	            format={'tv'}
	            movies={this.state.upcoming.titles} />
	          <MovieCarousel
	            category={'Fantasy'}
	            format={'tv'}
	            movies={this.state.fantasy.titles} />
	          <MovieCarousel
	            category={'Comedy'}
	            format={'tv'}
	            movies={this.state.comedy.titles} />
	          <MovieCarousel
	            category={'Horror'}
	            format={'tv'}
	            movies={this.state.horror.titles} />
	          <MovieCarousel
	            category={'Mystery'}
	            format={'tv'}
	            movies={this.state.mystery.titles} />
	        </div>
    	</div>
    ) : 'Loading'
  }

}