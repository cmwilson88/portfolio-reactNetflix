import React, {Component} from 'react'
import {CSSTransitionGroup} from 'react-transition-group'
import axios from 'axios'
import './navbar.css'

export default class Navbar extends Component {
	constructor() {
		super()

		this.state = {
			scrolled: false,
			searchActive: false,
			searchTerm: '',
			searchResults: []
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
    		searchTerm: event.target.value
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
    		axios.get(`https://api.themoviedb.org/3/search/movie?api_key=d40da9ada52b07d2ef67b21c7fe1bfa1&language=en-US&query=${this.state.searchTerm}&page=1&include_adult=false`)
    			.then(response => {
    				this.setState({
    					searchResults: response.data.results,
    					searchTerm: '',
    					searchActive: false
    				})
    			})	
    	}
    }

	render() {
		return (
			<nav className={this.state.scrolled ? 'navbar-scrolled' : 'navbar'}>
	          <div className="left_nav">
	            <a href="/"
	              	className="logo"
	              	style={{backgroundImage: `url(../assets/netflix1600.png)`}}>
	            </a>
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