import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import ProgramCarousel from './ProgramCarousel/ProgramCarousel'

import {
  getPopularMovies, 
  getUpcomingMovies, 
  getMoviesByCategory} from '../../services/movieLists'

export default class Home extends Component {
	constructor(props) {
		super(props)

	    this.state = {
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
			
			this.getRandomFeature = this.getRandomFeature.bind(this)
	}


  componentWillMount() {
    getPopularMovies().then(response => {
      this.setState({
        popular: Object.assign(
        			{}, 
        			this.state.popular, 
        			{
								format: 'movie',
        				programs: response
        			})
      })
    })
    getUpcomingMovies().then(response => {
      this.setState({
        upcoming: Object.assign(
        			{},
        			this.state.upcoming,
        			{
								format: 'movie',
        				programs: response
        			})
      })
    })

    for (let i = 0, j=this.state.categories.length; i < j; i++) {
    	let item = this.state.categories[i]
    	if(i === j-1) {
    		getMoviesByCategory(item.format, item.type, item.id).then(response => {
    			this.setState({
    				[item.category]: {
    								format: item.format,
										programs: response
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
    									programs: response
    								}
    			})
	    	})
    	}
		}
	}
	
	generateRandom(min, max) {
			min = Math.ceil(min)
			max = Math.floor(max)
			return Math.floor(Math.random() * (max-min)) + min;
	}

	getRandomFeature() {
		let targetedCategories = Object.keys(this.state)
																	.filter(cat => cat === 'netflix' || cat === 'hbo' || cat==='popular')
		let catIndex = this.generateRandom(0, targetedCategories.length);
		let selectedCategory = this.state[targetedCategories[catIndex]];
		let progIndex = this.generateRandom(0,selectedCategory.programs.length)
		return {
			format: selectedCategory.format,
			program: selectedCategory.programs[progIndex]
		}
	}

  render() {
		let featuredTitle
		if(this.state.ready) {
			featuredTitle = this.getRandomFeature()
		}

    return this.state.ready ? (
    	<div>
	    	<div 
	          className="hero"
	          style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1280${featuredTitle.program.backdrop_path})`}} >
	          <div className="hero_overlay">
	            <h1 className="hero_title">
	              {featuredTitle.program.title || featuredTitle.program.name}
	            </h1>
	            <div className="hero_buttons">
	              <Link className="video_link" to={`/${featuredTitle.format}/${featuredTitle.program.id}`}>
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
								{featuredTitle.program.overview.length > 350 ? (
									featuredTitle.program.overview.substr(0,350).trim() + '...'
								) : (
									featuredTitle.program.overview
								)}
	            </p>
	          </div>
	        </div>
	        <div className="moviesContainer">
	          <ProgramCarousel
	          	category={'Netflix'}
	          	format={this.state.netflix.format}
	          	programs={this.state.netflix.programs} />
			 			<ProgramCarousel
	          	category={'HBO'}
	          	format={this.state.hbo.format}
	          	programs={this.state.hbo.programs} />
	          <ProgramCarousel
	            category={'Trending'}
	            format={this.state.popular.format}
	            programs={this.state.popular.programs} />
	          <ProgramCarousel
	            category={'Upcoming'}
	            format={this.state.upcoming.format}
	            programs={this.state.upcoming.programs} />
	          <ProgramCarousel
	            category={'Fantasy'}
	            format={this.state.fantasy.format}
	            programs={this.state.fantasy.programs} />
	          <ProgramCarousel
	            category={'Comedy'}
	            format={this.state.comedy.format}
	            programs={this.state.comedy.programs} />
	          <ProgramCarousel
	            category={'Horror'}
	            format={this.state.horror.format}
	            programs={this.state.horror.programs} />
	          <ProgramCarousel
	            category={'Mystery'}
	            format={this.state.mystery.format}
	            programs={this.state.mystery.programs} />
	        </div>
    	</div>
    ) : 'Loading'
  }

}