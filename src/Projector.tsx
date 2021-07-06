import * as React from 'react'
import Context from './Context'
import Player from './Player'
import Controls from './Controls/ControlBars'

type Props = {
  src: string
  autoplay?: boolean
  muted?: boolean
  controls?: boolean
}

const Reflix = (props: Props) => {
  return (
    <Context src={props.src}>
      <div
        style={{
          position: 'relative',
          backgroundColor: '#000',
          height: '320px',
          width: '640px',
        }}
      >
        <Player />
        <Controls />
      </div>
    </Context>
  )
}

export default Reflix
