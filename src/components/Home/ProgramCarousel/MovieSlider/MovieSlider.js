import React from 'react'
import MovieTile from './MovieTile/MovieTile'

function MovieSlider(props){
    const programs = props.programs.map((program) => {
      return (
        <MovieTile
          movie={program} 
          moreInfoActive={props.moreInfoActive}
          moreInfoMovie={props.moreInfoProgram}
          mouseEnterInfo={props.mouseEnterInfo}
          displayMoreInfo={props.displayMoreInfo}
          key={program.id}/>
      )
    })
    return (
      <div>
          {programs}
      </div>
    );
  }

export default MovieSlider
