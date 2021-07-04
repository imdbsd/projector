import * as React from 'react'
import {useProjector} from '../Context'
import PlayIcon from '../../assets/play-button.svg'
import PauseIcon from '../../assets/pause-button.svg'

const PlayingControl = () => {
  const {player, toggleIsPlaying, isPlaying, canPlay} = useProjector()

  React.useEffect(() => {
    if (player) {
      player.addEventListener('play', toggleIsPlaying)
      player.addEventListener('pause', toggleIsPlaying)
      return () => {
        player.removeEventListener('play', toggleIsPlaying)
        player.removeEventListener('pause', toggleIsPlaying)
      }
    }
  }, [canPlay])
  return (
    <button
      onClick={() => {
        if (player) {
          isPlaying ? player.pause() : player.play()
          toggleIsPlaying()
        }
      }}
    >
      <img src={isPlaying ? PauseIcon : PlayIcon} />
    </button>
  )
}

export default PlayingControl
