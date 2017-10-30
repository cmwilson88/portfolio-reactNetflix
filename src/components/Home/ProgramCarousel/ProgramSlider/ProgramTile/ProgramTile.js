import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './programTile.css'

class programTile extends Component {
	constructor(props) {
      super(props)

      this.state = {
        tileActive: false
      }

      this.setActiveProgramTile = this.setActiveProgramTile.bind(this)
    }

    setActiveProgramTile() {
      this.props.moreInfo
      ?  this.setState({tileActive: true})
      :  this.setState({tileActive: false})
    }

    componentWillReceiveProps(nextProps) {
    	if(nextProps.moreInfoActive) {
    		if(nextProps.moreInfoProgram.id === this.props.program.id) {
    			this.setState({tileActive: true})
    		} 
    	} else {
    			this.setState({tileActive: false})
    		}
    }

    render() {
			const props = this.props;
		return (
		  <section  
		  	  onMouseEnter={() => {props.mouseEnterInfo(props.program)}}
		  	  onClick={() => {props.displayMoreInfo(props.program)}}
	        style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500${props.program.backdrop_path}`}}
		  	  className={this.state.tileActive && props.moreInfoProgram.id === props.program.id
	                        ? 'movieTile-active' : 'movieTile'}> 
		      <div className="tile__details">
		        <Link className="video_link" to={`/${props.format}/${props.program.id}`}> 
              <div className="tile__button">
  		            <i className="fa fa-play"></i>
  		        </div>
		        </Link>
            <div 
							className={this.props.moreInfoActive 
								? "tile__title-active" 
								: "tile__title" }>
		          {props.program.title || props.program.name}
		        </div>
						<div 
							className={this.props.moreInfoActive 
								? "tile__rating-active" 
								: "tile__rating" }>
		          <span
		            style={{color: props.program.vote_average >= 7 
													? 'green' 
													: props.program.vote_average >= 4 
														? 'orange' 
														: 'red'}}>
								{props.program.vote_average}</span> / 10
		        </div> 
		      </div>
		  </section>
		)	
    }
}

export default programTile