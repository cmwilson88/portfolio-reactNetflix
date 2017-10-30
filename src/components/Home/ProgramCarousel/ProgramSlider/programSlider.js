import React from 'react'
import ProgramTile from "./ProgramTile/ProgramTile";

function ProgramSlider(props){
    const programs = props.programs.map((program) => {
      return (
        <ProgramTile
          program={program} 
          moreInfoActive={props.moreInfoActive}
          moreInfoProgram={props.moreInfoProgram}
          mouseEnterInfo={props.mouseEnterInfo}
          displayMoreInfo={props.displayMoreInfo}
          format={props.format}
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
