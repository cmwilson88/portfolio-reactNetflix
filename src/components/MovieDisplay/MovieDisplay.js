import React, {Component} from 'react'
import {getProgramVideos} from '../../services/moreInfo'
import './movieDisplay.css'

export default class MovieDisplay extends Component {
	constructor() {
		super()

		this.state = {
			programTitle: '',
			programVideo: ''

		}
	}

	componentWillMount() {
		let format = this.props.match.path.includes('movie') ? 'movie' : 'tv'
		getProgramVideos(format, this.props.match.params.id).then(response => {
			console.log(response.videos.results)
			this.setState({
				programTitle: response.title || response.name,
				programVideo: response.videos.results.filter(video => video.site === 'YouTube' && (video.type === 'Trailer' || video.type === 'Opening Credits'))
									.reverse()[0]
			})
		})
	}
	render() {
		return (
			<div className="movie_display_body" style={{width: '100vw', height: '100vh'}}>
				{this.state.programVideo ? (
						<iframe 
							title="video_player"
							width="100%" 
							height="100%" 
							src={`https://www.youtube.com/embed/${this.state.programVideo.key}?autoplay=1&rel=0&showinfo=0`}
							frameBorder="0" 
							allowFullScreen></iframe>
				) : (
					<h1 className="search_header">There is currently no video for {this.state.programTitle}</h1>
				)}
			</div>
		)
	}
}

