import React, {Component} from 'react'
import './navbar.css'

export default class Navbar extends Component {
	constructor() {
		super()

		this.state = {
			scrolled: false,
			searchActive: false
		}

		this.handleScroll = this.handleScroll.bind(this)
		this.toggleSearch = this.toggleSearch.bind(this)
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

    toggleSearch() {
    	this.setState({
    		searchActive: !this.state.searchActive
    	})
    }

	render() {
		return (
			<nav className={this.state.scrolled ? 'navbar-scrolled' : 'navbar'}>
	          <div className="left_nav">
	            <div 
	              className="logo"
	              style={{backgroundImage: `url(../assets/netflix1600.png)`}}>
	            </div>
	            <span id="browse">Browse</span>
	            <span>Kids</span>
	            <span>DVD</span>
	          </div>
	          <div className="right_nav">
	            <div className="searchBox">
	              {this.state.searchActive ? (
	              		<div className="searchInput">
	              			<span 
	              				onClick={this.toggleSearch}
	              				className="fa fa-search"></span>
	              			<input 
	              				placeholder="Titles, peoples, genres"/>
	              		</div>
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