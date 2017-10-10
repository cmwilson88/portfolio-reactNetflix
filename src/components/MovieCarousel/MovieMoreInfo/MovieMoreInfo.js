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
			console.log(response)
			this.setState({
				detailedMovie: response,
				cast: response.credits.cast,
				directors: response.credits.crew
						.filter(item => item.job === 'Director'),
				genres: response.genres
			})
		}).catch(err => console.log(err))
	}

	render() {
		const detailedMovie = this.state.detailedMovie
		const releaseYear = detailedMovie.release_date.substr(0,4)
		
		let cast;
		let directors;
		let genres;
		
		if(this.state.cast) {
			cast = this.state.cast.splice(0,5)
							.map(castMember => {
								return (
									<li key={castMember.id}>{castMember.name}</li>
								)
							})	
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
	     					<span>{detailedMovie.runtime}</span>
	     					<span>{releaseYear}</span>
	     				</section>
	     				<p>{detailedMovie.overview}</p>
	     				<br/>
	     				{cast ? (
		     				<section className="movie_info">
		     					<span>Cast:</span>
			     					<ul>
			     						{cast}
			     					</ul>
		     				</section>
	     				): null}
     					{directors ? (
	     					<section className="movie_info">
	     						{directors.length > 1 ? (
	     							<span>Directors:</span>
	     						 ) : (
	     						 	<span>Director:</span>
	     						)} 
	     						<ul>
	     							{directors}
	     						</ul>
	     					</section>
	     				) : null}
	     				{genres ? (
	     					<section className="movie_info">
	     						{genres.length > 1 ? (
	     							<span>Genres:</span>
	     						) : (
	     							<span>Genre:</span>
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