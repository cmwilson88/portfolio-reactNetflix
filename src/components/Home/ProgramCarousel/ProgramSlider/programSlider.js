import React from 'react'
import ProgramTile from "./ProgramTile/ProgramTile";

function ProgramSlider(props){
    const programs = props.programs.map((program) => {
      return (
        <ProgramTile
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

export default ProgramSlider
