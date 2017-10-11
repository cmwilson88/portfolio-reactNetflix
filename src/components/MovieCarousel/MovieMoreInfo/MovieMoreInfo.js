import React, {Component} from 'react';
import {getMovieInfo} from '../../../services/moreInfo'

class MovieMoreInfo extends Component {
	constructor(props) {
		super(props) 

		this.state = {
			detailedMovie: props.displayMovie,
			cast: null,
			directors: null,
			genres: null
		}
	}

	componentDidMount() {
		getMovieInfo(this.props.displayMovie.id).then(response => {
			this.setState({
				detailedMovie: response,
				cast: response.credits.cast.splice(0,5),
				directors: response.credits.crew
						.filter(item => item.job === 'Director'),
				genres: response.genres
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
		return `${hours}h${minutes}m`
	};

	render() {
		const detailedMovie = this.state.detailedMovie
		const releaseYear = detailedMovie.release_date.substr(0,4)
		
		let runtime = this.calculateRuntime(detailedMovie.runtime)
		let cast;
		let directors;
		let genres;
		
		if(this.state.runtime) {
			runtime = this.state.runtime
		}		
		
		if(this.state.cast) {
			cast = this.state.cast
				.map((castMember, index) => {
					return (
						<li key={castMember.id}>
							<a href="#">
								{castMember.name}{index < this.state.cast.length -1 ? ',\u00A0' : ''}
							</a>
						</li>
					)
				})
			console.log(cast)	
		}

		if(this.state.directors) {
			directors = this.state.directors.map(director => {
				return (
					<li key={director.id}>{director.name}</li>
				)
			})
		}

		if(this.state.genres) {
			genres = this.state.genres.map(genre => {
				return (
					<li key={genre.id}>{genre.name}</li>
				)
			})
		}

		return (
	 		<section 
	 			className="moreInfo" 
	 			>
	 			<div className="moreInfoBG"
	 				style={{backgroundImage: `url(https://image.tmdb.org/t/p/w780${this.props.displayMovie.backdrop_path})`}}>
	     			<div className="moreInfoOverlay">
	     				<h1 className="hero_title">{detailedMovie.title}</h1>
	     				<section className="movie_info">
	     					<span>{runtime}</span>
	     					<span>{releaseYear}</span>
	     				</section>
	     				<p className="movie_info_overview">{detailedMovie.overview}</p>
	     				<br/>
	     				{cast ? (
		     				<section className="movie_info">
		     					<span className="movie_info_label">Cast:</span>
			     					<ul>
			     						{cast}
			     					</ul>
		     				</section>
	     				): null}
     					{directors ? (
	     					<section className="movie_info">
	     						{directors.length > 1 ? (
	     							<span className="movie_info_label">Directors:</span>
	     						 ) : (
	     						 	<span className="movie_info_label">Director:</span>
	     						)} 
	     						<ul>
	     							{directors}
	     						</ul>
	     					</section>
	     				) : null}
	     				{genres ? (
	     					<section className="movie_info">
	     						{genres.length > 1 ? (
	     							<span className="movie_info_label">Genres:</span>
	     						) : (
	     							<span className="movie_info_label">Genre:</span>
	     						)}
	     						<ul>
	     							{genres}
	     						</ul>
	     					</section>
	     				) : null}
	     				<p>{detailedMovie.tagline}</p>
	  				</div>
	 			</div>
	 		</section>
		)
	}
}

export default MovieMoreInfo