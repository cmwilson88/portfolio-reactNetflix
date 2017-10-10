import React, {Component} from 'react';
import {getMovieInfo} from '../../../services/moreInfo'

class MovieMoreInfo extends Component {
	constructor(props) {
		super(props) 

		this.state = {
			detailedMovie: props.displayMovie,
			cast: null
		}
	}

	componentDidMount() {
		getMovieInfo(this.props.displayMovie.id).then(response => {
			console.log(response)
			this.setState({
				detailedMovie: response,
				cast: response.credits.cast
			})
		}).catch(err => console.log(err))
	}

	render() {
		const detailedMovie = this.state.detailedMovie
		const releaseYear = detailedMovie.release_date.substr(0,4)
		let cast;
		if(this.state.cast) {
			cast = this.state.cast.splice(0,5)
							.map(castMember => {
								return (
									<li>{castMember.name}</li>
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
	     				<section>
	     					<span>Cast:</span>
	     					{cast ? (
		     					<ul>
		     						{cast}
		     					</ul>
	     					): null}
	     				</section>
	     				<p>{detailedMovie.tagline}</p>
	  				</div>
	 			</div>
	 		</section>
		)
	}
}

export default MovieMoreInfo