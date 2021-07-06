import * as React from 'react'
import {useProjector} from '../Context'
import generateTimeStamp from '../utils/generateTimeStamp'

const DurationControl = () => {
  const {duration: durationContext, timer: timerContext} = useProjector()
  const timer = React.useMemo(() => generateTimeStamp(timerContext), [
    timerContext,
  ])
  const duration = React.useMemo<string>(
    () => generateTimeStamp(durationContext),
    [durationContext]
  )

  return (
    <div className="pcontrol-duration">
      <span>
        {timer}/{duration}
      </span>
    </div>
  )
}

export default DurationControl
