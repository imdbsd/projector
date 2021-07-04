import * as React from 'react'
import PlayIcon from '../assets/play-button.svg'
import PauseIcon from '../assets/pause-button.svg'
import './controls.style.css'

type Props = {
  playerRef: React.MutableRefObject<HTMLVideoElement | null>
}

const Controls = (props: Props) => {
  const [isPlaying, setIsPlaying] = React.useState(false)
  return (
    <div className="reflix-controls">
      <button
        onClick={() => {
          const player = props.playerRef.current
          if (player) {
            isPlaying ? player.pause() : player.play()
            setIsPlaying((cur) => !cur)
            player.requestFullscreen()
          }
        }}
      >
        <img src={isPlaying ? PauseIcon : PlayIcon} />
      </button>
    </div>
  )
}

export default Controls
