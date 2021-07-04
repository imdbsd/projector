import * as React from 'react'
import {useProjector} from '../Context'

const generateTime = (time: number): string => {
  // TODO: handle more than minute timer
  const minute = Math.floor(time / 60)
  const second = Math.floor(time - minute * 60)
  return `${minute > 9 ? minute : `0${minute}`}:${
    second > 9 ? second : `0${second}`
  }`
}

const DurationControl = () => {
  const {duration: durationContext, player, canPlay} = useProjector()
  const [timer, setTimer] = React.useState<string>('00:00')
  const duration = React.useMemo<string>(() => generateTime(durationContext), [
    durationContext,
  ])

  const updateTime = React.useCallback(() => {
    if (player) {
      setTimer(generateTime(player.currentTime))
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
