import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './movieTile.css'

class movieTile extends Component {
	constructor(props) {
      super(props)

      this.state = {
        tileActive: false
      }

      this.setActiveMovieTile = this.setActiveMovieTile.bind(this)
    }

    setActiveMovieTile() {
      if(this.props.moreInfo) {
        this.setState({
          tileActive: true
        })
      } else {
        this.setState({
          tileActive: false
        })
      }
    }

    componentWillReceiveProps(nextProps) {
    	if(nextProps.moreInfoActive) {
    		if(nextProps.moreInfoMovie.id === this.props.movie.id) {
    			this.setState({
    				tileActive: true
    			})
    		} 
    	} else {
    			this.setState({
    				tileActive: false
    			})
    		}
    }

    render() {
    	const props = this.props;
		return (
		  <section  
		  	  onMouseEnter={() => {
		  	  	props.mouseEnterInfo(props.movie)
		  	  }}
		  	  onClick={() => {
		  	  	props.displayMoreInfo(props.movie)
		  	  }}
		  	  className={this.state.tileActive && props.moreInfoMovie.id === props.movie.id
	                        ? 'movieTile-active' : 'movieTile'} 
	          style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500${props.movie.backdrop_path}`}}>
		      <div className="tile__details">
		        <Link to={`/${props.movie.id}`}> 
              <div className="tile__button">
  		            <i className="fa fa-play"></i>
  		        </div>
		        </Link>
            <div className={this.props.moreInfoActive ? "tile__title-active" : "tile__title" }>
		          {props.movie.title}
		        </div>
		        <div className={this.props.moreInfoActive ? "tile__rating-active" : "tile__rating" }>
		          <span
		            style={{
		              color: props.movie.vote_average >= 7 ? 'green' : props.movie.vote_averrating= 4 ? 'orange' : 'red'
		            }}>{props.movie.vote_average}</span> / 10
		        </div> 
		      </div>
		  </section>
		)	
    }
}

export default movieTile