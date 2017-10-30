import React, {Component} from 'react'
import {CSSTransitionGroup} from 'react-transition-group';
import ProgramSlider from './ProgramSlider/programSlider'
import ProgramMoreInfo from './ProgramMoreInfo/ProgramMoreInfo'

class ProgramCarousel extends Component {
	constructor(props) {
		super(props)

		this.state = {
			leftMargin: 0,
			moreInfoActive: false,
			moreInfoProgram: null
		}

		let timeout = null;
  	
		this.moveRowRight = this.moveRowRight.bind(this)
		this.moveRowLeft = this.moveRowLeft.bind(this)
		this.moreInfoMouseEnter = this.moreInfoMouseEnter.bind(this)
		this.displayMoreInfo = this.displayMoreInfo.bind(this)
	}

	moveRowRight() {
    let newMargin = this.state.leftMargin - 1008
    this.setState({
      leftMargin: newMargin
    })
  }

	moveRowLeft() {
    let newMargin = this.state.leftMargin + 1008
    if(newMargin > 0) {
      newMargin = 0
    }
    this.setState({
      leftMargin: newMargin
    })
  }

  displayMoreInfo(program) {
  	this.setState({
  		moreInfoActive: !this.state.moreInfoActive,
  		moreInfoProgram: program
  	})
  }

  moreInfoMouseEnter(program) {
  	if(this.timeout) {
  		clearTimeout(this.timeout)
  	}

		this.timeout = setTimeout(() => {
			this.setState({
				moreInfoProgram: program
			})
			this.timeout = null;
		}, 500)
  }

	render() {
		return (
			<div className='movieCategoryRow'>
	          <h3 className="rowHeader">{this.props.category}</h3>
	          <div className="movieRow">
		          <span 
		            className="rowButton leftRowButton"
		            onClick={() => this.moveRowLeft()}>
		            	<i className="fa fa-chevron-left"></i>
		            </span>
		          
		          <div className="row">
		            <div 
		            	className={this.state.moreInfoActive ? 'moviesCarousel-active' : 'moviesCarousel'} 
		            	style={{marginLeft: `${this.state.leftMargin}px`}}>
		              <ProgramSlider 
		              	moreInfoProgram={this.state.moreInfoProgram}
		              	moreInfoActive={this.state.moreInfoActive} 
		              	mouseEnterInfo={this.moreInfoMouseEnter} 
		              	displayMoreInfo={this.displayMoreInfo} 
										format={this.props.format}
		              	programs={this.props.programs}/>
		            </div>
		          </div>
		          
		          <span
		          	role="button" 
		            className="rowButton rightRowButton"
		            onClick={() => this.moveRowRight()}>
		            	<i className="fa fa-chevron-right"></i>
		          </span>
	          
	          </div>
	     			<CSSTransitionGroup
				      transitionName="example"
				      transitionEnterTimeout={500}
				      transitionLeave={false}>
								{this.state.moreInfoActive ? (
									<ProgramMoreInfo
										displayProgram={this.state.moreInfoProgram}
										format={this.props.format}
										key={this.state.moreInfoProgram.id}
									/>
								) : null}
						 </CSSTransitionGroup>
	     </div>
		) 
	}
}

export default ProgramCarousel