import * as React from 'react'
import {useProjector} from './Context'

const Player = () => {
  const {src, playerRef, height, width} = useProjector()
  return (
    <video height={height} width={width} ref={playerRef} controls muted>
      <source src={src} />
    </video>
  )
}

export default Player
