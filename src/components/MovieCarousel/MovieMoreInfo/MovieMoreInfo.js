import React, {Component} from 'react';

class MovieMoreInfo extends Component {
	constructor(props) {
		super(props) 

		this.state = {
			detailedMovie: props.displayMovie
		}
	}

	render() {
		return (
	 		<section 
	 			className="moreInfo" 
	 			key={this.props.displayMovie.id} 
	 			>
	 			<div className="moreInfoBG"
	 				style={{backgroundImage: `url(https://image.tmdb.org/t/p/w780${this.props.displayMovie.backdrop_path})`}}>
	     			<div className="moreInfoOverlay">
	     				<h1 className="hero_title">{this.props.displayMovie.title}</h1>
	     				<p>{this.props.displayMovie.overview}</p>
	  				</div>
	 			</div>
	 		</section>
		)
	}
}

export default MovieMoreInfo