import * as React from 'react'
import {useProjector} from '../Context'

const ProgressBar = () => {
  const {duration, timer, buffereds, player} = useProjector()
  const trackBarRef = React.useRef<HTMLDivElement>(null)
  const isClickTrackRef = React.useRef<boolean>(false)
  const progress = React.useMemo(() => (timer / duration) * 100, [
    duration,
    timer,
  ])
  // TODO: Read more buffered, now only show the first buffered
  const [buffered] = buffereds
  const bufferedProgress = buffered ? (buffered.end / duration) * 100 : 0

  const computeMouseOnTimeStamp = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>, duration: number) => {
      if (trackBarRef.current) {
        const track = trackBarRef.current
        // @ts-ignore fix type
        const target: HTMLDivElement = event.target
        const trackWidth = track.clientWidth
        const clickPosition =
          event.pageX > trackWidth
            ? trackWidth
            : // compat: need to increase the offset according to the padding track
              event.pageX - (track.offsetLeft + 10)

        const percentageOfClickedTrack =
          clickPosition > 0 ? (clickPosition / trackWidth) * 100 : 0
        return (duration * percentageOfClickedTrack) / 100
      }
      return 0
    },
    []
  )

  const onClickTrack = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (player) {
        const clickedTimeStamp = computeMouseOnTimeStamp(event, duration)
        player.currentTime = clickedTimeStamp
      }
    },
    [duration, player]
  )

  const onMouseDown = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      isClickTrackRef.current = true
      if (isClickTrackRef.current && player) {
        const clickedTimeStamp = computeMouseOnTimeStamp(event, duration)
        player.currentTime = clickedTimeStamp
      }
    },
    [duration, player]
  )

  const disableDrag = React.useCallback(() => {
    isClickTrackRef.current = false
  }, [])

  const onDragDot = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (isClickTrackRef.current && player) {
        const clickedTimeStamp = computeMouseOnTimeStamp(event, duration)
        player.currentTime = clickedTimeStamp
      }
    },
    [duration, player]
  )

  return (
    <div className="pcontrol-progressbar">
      <div
        ref={trackBarRef}
        className="pcontrol-progressbar__track"
        onClick={onClickTrack}
        onMouseDown={onMouseDown}
        onMouseUp={disableDrag}
        onMouseLeave={disableDrag}
        onMouseMove={onDragDot}
      >
        {bufferedProgress ? (
          <div
            className="pcontrol-progressbar__buffered"
            style={{width: `${Math.floor(bufferedProgress)}%`}}
          />
        ) : null}
        <div
          className="pcontrol-progressbar__progress"
          style={{width: `${Math.floor(progress)}%`}}
        />
      </div>
    </div>
  )
}

export default ProgressBar
