import * as React from 'react'
import {ProjectorProvider, useProjector} from './Context'
import Player from './Player'
import Controls from './Controls/ControlBars'

type Props = {
  src: string
  autoplay?: boolean
  muted?: boolean
  controls?: boolean
}

const Projector = () => {
  const {width, height, isPlaying} = useProjector()
  const [showControl, setShowControl] = React.useState(true)

  const showProjectorControl = React.useCallback(() => {
    setShowControl(true)
  }, [])
  const hideProjectorControl = React.useCallback(() => {
    if (isPlaying) {
      setShowControl(false)
    }
  }, [isPlaying])

  React.useEffect(() => {
    if (showControl && isPlaying) {
      const hideTimeOut = setTimeout(() => {
        setShowControl(false)
      }, 5000)
      return () => {
        clearTimeout(hideTimeOut)
      }
    }
  }, [showControl, isPlaying])

  return (
    <div
      className="projector-wrapper"
      style={{
        height: `${height}px`,
        width: `${width}px`,
      }}
      onMouseEnter={showProjectorControl}
      onMouseMove={showProjectorControl}
      onMouseLeave={hideProjectorControl}
    >
      <Player />
      <Controls show={showControl} />
    </div>
  )
}

const ContextedProjector = (props: Props) => (
  <ProjectorProvider src={props.src}>
    <Projector />
  </ProjectorProvider>
)

export default ContextedProjector
