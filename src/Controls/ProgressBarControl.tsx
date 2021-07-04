import * as React from 'react'
import {useProjector} from '../Context'

const ProgressBar = () => {
  const {duration, timer} = useProjector()
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const percentage = (timer / duration) * 100
    setProgress(percentage)
  }, [duration, timer])

  return (
    <div className="pcontrol-progressbar">
      <div className="pcontrol-progressbar__track">
        <div
          className="pcontrol-progressbar__progress"
          style={{width: `${progress}%`}}
        />
      </div>
    </div>
  )
}

export default ProgressBar
