import * as React from 'react'
import {useProjector} from '../Context'

const ProgressBar = () => {
  const {player, canPlay} = useProjector()
  return (
    <div className="pcontrol-progressbar">
      <div className="pcontrol-progressbar__bar"></div>
    </div>
  )
}

export default ProgressBar
