import React, {Component} from 'react'
import {getMovieVideos} from '../../services/moreInfo'

export default class MovieDisplay extends Component {
	constructor() {
		super()

		this.state = {
			movieTitle: '',
			movieVideo: ''

		}
	}

	componentWillMount() {
		getMovieVideos(this.props.match.params.id).then(response => {
			this.setState({
				movieTitle: response.title,
				movieVideo: response.videos.results.filter(video => video.site === 'YouTube' && video.type === 'Trailer' || video.type === 'Featurette')[0]
			})
		})
	}
	render() {
		console.log(this.state)
		console.log(this.state.movieVideo.key)
		return this.state.movieVideo.key ? (
			<div style={{width: '100vw', height: '100vh'}}>
				<iframe 
					width="100%" 
					height="100%" 
					src={`https://www.youtube.com/embed/${this.state.movieVideo.key}?autoplay=1&rel=0&showinfo=0`}
					frameBorder="0" 
					allowFullScreen></iframe>
			</div>
		) : 'There is currently no video for ' + this.state.movieTitle
	}
}

