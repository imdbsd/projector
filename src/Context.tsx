import * as React from 'react'

type State = {
  isPlaying: boolean
  toggleIsPlaying: () => void
  src: string
  height: number
  width: number
  playerRef: React.MutableRefObject<HTMLVideoElement | null>
  player: HTMLVideoElement | null

  canPlay: boolean
  // video meta
  duration: number
  timer: number
  // end of video meta
}

const initialState: State = {
  isPlaying: false,
  toggleIsPlaying: () => {},
  src: '',
  height: 320,
  width: 640,
  playerRef: {current: null},
  player: null,

  canPlay: false,
  // video meta
  duration: 0,
  timer: 0,
  // end of video meta
}

const ProjectorContext = React.createContext(initialState)

const ProjectorProvider: React.FC<{src: string}> = (props) => {
  const playerRef = React.useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [canPlay, setCanPlay] = React.useState(false)
  const [duration, setDuration] = React.useState(0)
  const [timer, setTimer] = React.useState(0)
  const toggleIsPlaying = React.useCallback(() => {
    setIsPlaying((cur) => !cur)
  }, [])

  const onMetaLoaded = React.useCallback(() => {
    if (playerRef.current) {
      setDuration(playerRef.current.duration)
    }
  }, [])

  const onLoadedData = React.useCallback(() => {
    console.log('can play')
    setCanPlay(true)
  }, [])

  const updateTime = React.useCallback(() => {
    if (playerRef.current) {
      setTimer(playerRef.current.currentTime)
    }
  }, [])

  React.useEffect(() => {
    if (playerRef.current) {
      const player = playerRef.current
      player.addEventListener('loadedmetadata', onMetaLoaded)
      player.addEventListener('loadeddata', onLoadedData)
      player.addEventListener('timeupdate', updateTime)
      player.addEventListener('seeking', updateTime)
      return () => {
        player.removeEventListener('loadedmetadata', onMetaLoaded)
        player.removeEventListener('loadeddata', onLoadedData)
        player.removeEventListener('timeupdate', updateTime)
        player.removeEventListener('seeking', updateTime)
      }
    }
  }, [])

  return (
    <React.Fragment>
      <ProjectorContext.Provider
        value={{
          isPlaying,
          toggleIsPlaying,
          playerRef,
          player: playerRef.current,
          src: props.src,
          height: 320,
          width: 640,
          canPlay,
          duration,
          timer,
        }}
      >
        {props.children}
      </ProjectorContext.Provider>
    </React.Fragment>
  )
}

export const useProjector = () => React.useContext(ProjectorContext)

export default ProjectorProvider
