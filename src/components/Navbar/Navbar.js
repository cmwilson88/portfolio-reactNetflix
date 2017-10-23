import React, {Component} from 'react'
import {CSSTransitionGroup} from 'react-transition-group'
import {connect} from 'react-redux'
import {search} from '../../ducks/reducer'
import {Link, withRouter} from 'react-router-dom'
import classNames from 'classnames'
import './navbar.css'

class Navbar extends Component {
	constructor() {
		super()

		this.state = {
			scrolled: false,
			searchActive: false,
			searchTerm: '',
			searchResults: [],
		}

		this.handleScroll = this.handleScroll.bind(this)
		this.toggleSearch = this.toggleSearch.bind(this)
		this.handleInput = this.handleInput.bind(this)
		this.searchMovies = this.searchMovies.bind(this)
	}

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);        
    }

    componentWillUnmount() {
    	window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(event) {
    	if(event.srcElement.scrollingElement.scrollTop > 50) {
    		this.setState({
    			scrolled: true
    		})
    	} else {
    		this.setState({
    			scrolled: false
    		})
    	}
    }

    handleInput(event) {
    	this.setState({
    		searchTerm: event.target.value.trim()
    	})
    }

    toggleSearch() {
    	this.setState({
    		searchActive: !this.state.searchActive
    	})
    }

    searchMovies(event) {
    	if(event.charCode === 13) {
    		event.stopPropagation();
    		event.preventDefault();
    		this.props.search(this.state.searchTerm)
    		this.setState({
    			searchTerm: '',
    			searchActive: false,
    		})
    		this.props.history.push('/search')
    	}
    }

	render() {
		const navbarClass = classNames({
			'navbar': !this.state.scrolled,
			'navbar-scrolled': this.state.scrolled,
			'navbar_video':  /\d/.test(this.props.location.pathname)
		})
		return (
			<nav 
				className={navbarClass}>
	          <div className="left_nav">
	            <Link to="/"
		              	className="logo"
		              	style={{backgroundImage: `url(../assets/netflix1600.png)`}}>
	            </Link>
	            <span id="browse">Browse</span>
	            <span>Kids</span>
	            <span>DVD</span>
	          </div>
	          <div className="right_nav">
	            <div className="searchBox">
	              {this.state.searchActive ? (
		              	<CSSTransitionGroup
		              		transitionName="search_transition"
		              		transitionAppear={true}
		              		transitionAppearTimeout={250}
		              		transitionEnter={false}
		              		transitionLeaveTimeout={250}>
		              		<div className="searchInput">
		              			<span 
		              				onClick={this.toggleSearch}
		              				className="fa fa-search"></span>
		              			<input 
		              				autoFocus
		              				onChange={this.handleInput}
		              				onKeyPress={this.searchMovies}
		              				placeholder="Titles, peoples, genres"/>
		              		</div>
		              	</CSSTransitionGroup>
	              	) : (
	              		<button 
	            	 		onClick={this.toggleSearch}
	              			className="searchTab">
	              			<span className="fa fa-search"></span>
	              			<span className="label">Search</span>
	              		</button>
	              	)}
	            </div>
	            
	            <i className="fa fa-bell"></i>
	            
	            <div className="nav_user">
	              <div className="nav_user_image"></div>
	              <span id="nav_user_name">Christopher</span>
	            </div>
	          </div>
	        </nav>
		)
	}
}


export default withRouter(connect(null,{search})(Navbar));