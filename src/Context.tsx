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
  buffereds: Array<{start: number; end: number}>
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
  buffereds: [],
  // end of video meta
}

const ProjectorContext = React.createContext(initialState)
export const ProjectorConsumer = ProjectorContext.Consumer

export const ProjectorProvider: React.FC<{src: string}> = (props) => {
  const playerRef = React.useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [canPlay, setCanPlay] = React.useState(false)
  const [duration, setDuration] = React.useState(0)
  const [timer, setTimer] = React.useState(0)
  const [buffereds, setBuffereds] = React.useState<
    Array<{start: number; end: number}>
  >([])
  const toggleIsPlaying = React.useCallback(() => {
    setIsPlaying((cur) => !cur)
  }, [])

  const onMetaLoaded = React.useCallback(() => {
    if (playerRef.current) {
      setDuration(playerRef.current.duration)
    }
  }, [])

  const onLoadedData = React.useCallback(() => {
    setCanPlay(true)
  }, [])

  const onUpdateTime = React.useCallback(() => {
    if (playerRef.current) {
      setTimer(playerRef.current.currentTime)
    }
  }, [])

  const onPlayerEnd = React.useCallback(() => {
    setIsPlaying(false)
  }, [])

  const onProgress = React.useCallback(() => {
    if (playerRef.current) {
      const player = playerRef.current
      const bufferedLength = player.buffered.length
      const playerBuffereds = []
      for (let index = 0; index < bufferedLength; index++) {
        playerBuffereds.push({
          start: player.buffered.start(index),
          end: player.buffered.end(index),
        })
      }
      setBuffereds(playerBuffereds)
    }
  }, [])

  React.useEffect(() => {
    if (playerRef.current) {
      const player = playerRef.current
      player.addEventListener('loadedmetadata', onMetaLoaded)
      player.addEventListener('loadeddata', onLoadedData)
      player.addEventListener('timeupdate', onUpdateTime)
      player.addEventListener('seeking', onUpdateTime)
      player.addEventListener('progress', onProgress)
      player.addEventListener('ended', onPlayerEnd)
      return () => {
        player.removeEventListener('loadedmetadata', onMetaLoaded)
        player.removeEventListener('loadeddata', onLoadedData)
        player.removeEventListener('timeupdate', onUpdateTime)
        player.removeEventListener('seeking', onUpdateTime)
        player.removeEventListener('progress', onProgress)
        player.removeEventListener('ended', onPlayerEnd)
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
          buffereds,
        }}
      >
        {props.children}
      </ProjectorContext.Provider>
    </React.Fragment>
  )
}

export const useProjector = () => React.useContext(ProjectorContext)
