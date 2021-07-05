import * as React from 'react'
import PlayingControl from './PlayingControl'
import DurationControl from './DurationControl'
import ProgressBarControl from './ProgressBarControl'
import './controls.style.css'

type Props = {
  show?: boolean
}
const ControlBars: React.FC<Props> = (props) => {
  return (
    <div className={`projector-controlbar ${props.show ? 'show' : ''}`}>
      <ProgressBarControl />
      <div className="projector-controlbar__control">
        <PlayingControl />
        <DurationControl />
      </div>
    </div>
  )
}

export default ControlBars
