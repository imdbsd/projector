import * as React from 'react'
import {ProjectorProvider, ProjectorConsumer} from './Context'
import Player from './Player'
import Controls from './Controls/ControlBars'

type Props = {
  src: string
  autoplay?: boolean
  muted?: boolean
  controls?: boolean
}

const Projector = (props: Props) => {
  return (
    <ProjectorProvider src={props.src}>
      <ProjectorConsumer>
        {(context) => (
          <div
            style={{
              position: 'relative',
              backgroundColor: '#000',
              height: `${context.height}px`,
              width: `${context.width}px`,
            }}
          >
            <Player />
            <Controls />
          </div>
        )}
      </ProjectorConsumer>
    </ProjectorProvider>
  )
}

export default Projector
