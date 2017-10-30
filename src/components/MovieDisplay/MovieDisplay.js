import React, {Component} from 'react'
import {getProgramVideos} from '../../services/moreInfo'

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
				programVideo: response.videos.results.filter(video => video.site === 'YouTube' && video.type === 'Trailer')
									.reverse()[0]
			})
		})
	}
	render() {
		console.log(this.state)
		console.log(this.state.programVideo.key)
		return this.state.programVideo.key ? (
			<div style={{width: '100vw', height: '100vh'}}>
				<iframe 
					title="video_player"
					width="100%" 
					height="100%" 
					src={`https://www.youtube.com/embed/${this.state.programVideo.key}?autoplay=1&rel=0&showinfo=0`}
					frameBorder="0" 
					allowFullScreen></iframe>
			</div>
		) : 'There is currently no video for ' + this.state.programTitle
	}
}

