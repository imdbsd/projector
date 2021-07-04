import * as React from 'react'
import PlayingControl from './PlayingControl'
import DurationControl from './DurationControl'
import ProgressBarControl from './ProgressBarControl'
import './controls.style.css'

const ControlBars = () => {
  return (
    <div className="projector-controlbar">
      <ProgressBarControl />
      <div className="projector-controlbar__control">
        <PlayingControl />
        <DurationControl />
      </div>
    </div>
  )
}

export default ControlBars
