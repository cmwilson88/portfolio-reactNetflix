import React, {Component} from 'react';
import {getMovieInfo} from '../../../services/moreInfo'
import './movieMoreInfo.css'

import MovieOverview from './MovieOverview/MovieOverview'
import DetailsSection from './DetailsSection/DetailsSection'

class MovieMoreInfo extends Component {
	constructor(props) {
		super(props) 

		this.state = {
			detailedMovie: props.displayMovie,
			images: null,
			overview: true,
			recommended: false,
			details: false,

			cast: null,
			directors: null,
			genres: null,

			similar: null,

			keywords: null,
			reviews: null
		}

	}

	componentDidMount() {
		getMovieInfo(this.props.displayMovie.id).then(response => {
			this.setState({
				detailedMovie: response,
				images: response.images.backdrops
					.filter(img => img.width >1200 && img.width < 2000)[0],
				cast: response.credits.cast,
				directors: response.credits.crew
						.filter(item => item.job === 'Director'),
				genres: response.genres,
				similar: response.similar.results
					// .sort((a,b) => b.vote_average - a.vote_average)
					.splice(0,4),
				keywords: response.keywords.keywords
					.splice(0,10)
					.map(keyword => {
						return keyword.name
								.split(' ')
								.map(keyword => {
									return keyword[0].toUpperCase() + keyword.substr(1)
								}).join(' ')
				}),
				reviews: response.reviews.results.length 
						? response.reviews.results 
						: null
			})
		}).catch(err => console.log(err))
	}

	calculateRuntime(x) {
		let minutes = 0;
		let hours = 0;
		while (x >= 60) {
			x = x-60
			hours++
		}
		minutes = Math.ceil(x);
		return `${hours}h ${minutes}m`
	};



	render() {
		const detailedMovie = this.state.detailedMovie
		const releaseYear = detailedMovie.release_date.substr(0,4)
		
		let runtime = this.calculateRuntime(detailedMovie.runtime)
		let match = detailedMovie.vote_average * 10
		let mainCast = [];
		let directors;
		let genres;
		let similar;
			

		if(this.state.cast) {
			for(let i = 0; i < 5; i++) {
				mainCast.push(
						<li key={this.state.cast[i].id}>
							<a href="#">
								{this.state.cast[i].name}
							</a>
							{i < 4 ? ',\u00A0' : ''}
						</li>
				)
			}
		}

		if(this.state.directors) {
			directors = this.state.directors.map((director,index) => {
				return (
					<li key={director.id}>
						<a href="#">
							{director.name}
						</a>
						{index < this.state.directors.length -1 ? ',\u00A0' : ''}
					</li>
				)
			})
		}

		if(this.state.genres) {
			genres = this.state.genres.map((genre, index) => {
				return (
					<li key={genre.id}>
						<a href="#">
							{genre.name}
						</a>
						{index < this.state.genres.length -1 ? ',\u00A0' : ''}
					</li>
				)
			})
		}

		
		if(this.state.similar) {
			similar = this.state.similar.map((movie, index) => {
				const releaseYear = movie.release_date.substr(0,4)
				return (
					<div key={movie.id} className="similar_tile">
						<div 
							className="similar_media"
							style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}}>
						</div>
						<p>{movie.title} - {releaseYear}</p>
						<p className="similar_overview">{movie.overview.substr(0,150).trim() + '...'}</p>
					</div>
				)
			})
		}

		return (
	 		<section 
	 			className="moreInfo" 
	 			>
	 			<div className="moreInfoBG"
	 				style={{backgroundImage: `url(https://image.tmdb.org/t/p/w780${detailedMovie.backdrop_path})`}}>
	     			<div className={this.state.overview ? 'moreInfoOverlay' : 'moreInfoOverlayDark'}>
		     		<h1 className="movie_info_title">{detailedMovie.title}</h1>
		     			<div className="moreInfoContent">
			     			{this.state.overview ? (
			     				<MovieOverview 
			     					detailedMovie={detailedMovie}
			     					releaseYear={releaseYear}
			     					runtime={runtime}
			     					match={match}
			     					cast={mainCast}
			     					directors={directors}
			     					genres={genres}
			     				/>
			     			) : null}

			     			{this.state.recommended ? (
			     				<div className="similar_container">
			     					{similar}
			     				</div>
			     			) : null}

			     			{this.state.details ? (
			     				<DetailsSection
			     					directors={this.state.directors}
			     					cast={this.state.cast}
			     					genres={this.state.genres}
			     					keywords={this.state.keywords}
			     					reviews={this.state.reviews}/>
			     			) : null}
		     			</div>

	     				<ul className="moreInfoNav">
	     					<li className={this.state.overview ? 'moreInfoNavItemActive' : 'moreInfoNavItem'}
	     						onClick={() => {
		     						this.setState({
		     							overview: true,
		     							recommended: false,
		     							details: false
		     						})
	     						}}
	     					>Overview</li>
	     					<li className={this.state.recommended ? 'moreInfoNavItemActive' : 'moreInfoNavItem'}
	     						onClick={() => {
		     						this.setState({
		     							overview: false,
		     							recommended: true,
		     							details: false
		     						})
	     						}}
	     					>More Like This</li>
	     					<li className={this.state.details ? 'moreInfoNavItemActive' : 'moreInfoNavItem'}
	     						onClick={() => {
		     						this.setState({
		     							overview: false,
		     							recommended: false,
		     							details: true
		     						})
	     						}}
	     					>Details</li>
	     				</ul>
	  				</div>
	 			</div>
	 		</section>
		)
	}
}

export default MovieMoreInfo