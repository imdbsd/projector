import * as React from 'react'
import Player from './Player'
import Controls from './Controls'

type Props = {
  src: string
  autoplay?: boolean
  muted?: boolean
  controls?: boolean
}

const Reflix = (props: Props) => {
  const playerRef = React.useRef<HTMLVideoElement>(null)
  console.log({playerRef})
  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: '#000',
        height: '320px',
        width: '640px',
      }}
    >
      <Player {...props} playerRef={playerRef} />
      <Controls playerRef={playerRef} />
    </div>
  )
}

export default Reflix
