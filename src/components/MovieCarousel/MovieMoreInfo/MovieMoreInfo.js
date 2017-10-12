import React, {Component} from 'react';
import {getMovieInfo} from '../../../services/moreInfo'
import './movieMoreInfo.css'

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
		return `${hours}h ${minutes}m`
	};

	render() {
		const detailedMovie = this.state.detailedMovie
		const releaseYear = detailedMovie.release_date.substr(0,4)
		
		let runtime = this.calculateRuntime(detailedMovie.runtime)
		let match = detailedMovie.vote_average * 10
		let cast;
		let directors;
		let genres;
			
		
		if(this.state.cast) {
			cast = this.state.cast
				.map((castMember, index) => {
					return (
						<li key={castMember.id}>
							<a href="#">
								{castMember.name}
							</a>
							{index < this.state.cast.length -1 ? ',\u00A0' : ''}
						</li>
					)
				})
			console.log(cast)	
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

		return (
	 		<section 
	 			className="moreInfo" 
	 			>
	 			<div className="moreInfoBG"
	 				style={{backgroundImage: `url(https://image.tmdb.org/t/p/w780${this.props.displayMovie.backdrop_path})`}}>
	     			<div className="moreInfoOverlay">
	     				<div className="movie_info">
		     				<h1 className="movie_info_title">{detailedMovie.title}</h1>
		     				<section className="mi_section mi_year_time">
		     					<span style={{
                    				color: match >= 70 
                    				? 'green' 
                    				: match >= 40
                    				? 'orange' 
                    				: 'red'
                  					}}>
                  					{match}% Match
                  				</span>
		     					<span>{releaseYear}</span>
		     					<span>{runtime}</span>
		     				</section>
		     				<p className="mi_section movie_info_overview">{detailedMovie.overview}</p>
		     				<br/>
		     				<div className="mi_section">
			     				{cast ? (
				     				<section className="mi_cast_crew">
				     					<span className="movie_info_label">Cast:</span>
					     					<ul>
					     						{cast}
					     					</ul>
				     				</section>
			     				): null}
		     					{directors ? (
			     					<section className="mi_cast_crew">
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
			     					<section className="mi_cast_crew">
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
		     				</div>
		     				<p className="mi_section">{detailedMovie.tagline}</p>
	     				</div>


	     				<ul className="moreInfoNav">
	     					<li>Overview</li>
	     					<li>More Like This</li>
	     					<li>Details</li>
	     				</ul>
	  				</div>
	 			</div>
	 		</section>
		)
	}
}

export default MovieMoreInfo