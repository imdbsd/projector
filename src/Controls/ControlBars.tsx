import * as React from 'react'
import PlayingControl from './PlayingControl'
import DurationControl from './DurationControl'
import './controls.style.css'

const ControlBars = () => {
  return (
    <div className="reflix-controls">
      <PlayingControl />
      <DurationControl />
    </div>
  )
}

export default ControlBars
