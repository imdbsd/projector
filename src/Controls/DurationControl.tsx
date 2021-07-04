import * as React from 'react'
import {useProjector} from '../Context'
import generateTimeStamp from '../utils/generateTimeStamp'

const DurationControl = () => {
  const {duration: durationContext, player, canPlay} = useProjector()
  const [timer, setTimer] = React.useState<string>('00:00')
  const duration = React.useMemo<string>(
    () => generateTimeStamp(durationContext),
    [durationContext]
  )

  const updateTime = React.useCallback(() => {
    if (player) {
      setTimer(generateTimeStamp(player.currentTime))
    }
  }, [player])

  React.useEffect(() => {
    if (player) {
      player.addEventListener('timeupdate', updateTime)
      player.addEventListener('seeking', updateTime)

      return () => {
        if (player) {
          player.removeEventListener('timeupdate', updateTime)
          player.removeEventListener('seeking', updateTime)
        }
      }
    }
  }, [canPlay, updateTime])

  return (
    <div className="pcontrol-duration">
      <span>
        {timer}/{duration}
      </span>
    </div>
  )
}

export default DurationControl
