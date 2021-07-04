import * as React from 'react'

type Props = {
  src: string
  playerRef: React.MutableRefObject<HTMLVideoElement | null>
  autoplay?: boolean
  muted?: boolean
  controls?: boolean
}
const Player = (props: Props) => {
  const {src, playerRef} = props
  const height = 320
  const width = 640
  return (
    <video height={height} width={width} ref={playerRef}>
      <source src={src} />
    </video>
  )
}

export default Player
