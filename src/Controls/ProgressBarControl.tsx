import * as React from 'react'
import {useProjector} from '../Context'

const ProgressBar = () => {
  const {duration, timer, buffereds} = useProjector()
  const progress = React.useMemo(() => (timer / duration) * 100, [
    duration,
    timer,
  ])
  // TODO: Read more buffered, now only show the first buffered
  const [buffered] = buffereds
  const bufferedProgress = buffered ? (buffered.end / duration) * 100 : 0

  return (
    <div className="pcontrol-progressbar">
      <div className="pcontrol-progressbar__track">
        {bufferedProgress && (
          <div
            className="pcontrol-progressbar__buffered"
            style={{width: `${bufferedProgress}%`}}
          />
        )}
        <div
          className="pcontrol-progressbar__progress"
          style={{width: `${progress}%`}}
        />
      </div>
    </div>
  )
}

export default ProgressBar
