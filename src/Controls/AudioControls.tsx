import * as React from 'react'
import {useProjector} from '../Context'
import VolumeZero from '../../assets/volume-0.svg'
import VolumeOne from '../../assets/volume-1.svg'
import VolumeTwo from '../../assets/volume-2.svg'
import VolumeFull from '../../assets/volume-full.svg'
import VolumeMute from '../../assets/volume-mute.svg'

const getVolumeIcons = (volume: number): string => {
  if (volume <= 1 && volume >= 0.75) {
    return VolumeFull
  }
  if (volume < 0.75 && volume >= 0.5) {
    return VolumeTwo
  }
  if (volume < 0.5 && volume >= 0.25) {
    return VolumeOne
  }
  if (volume < 0.25 && volume > 0) {
    return VolumeZero
  }
  return VolumeMute
}

const AudioControls = () => {
  // used to check the current volume before it was toggled to mute or not
  const currentVolumeRef = React.useRef(1)
  const volumeTrackRef = React.useRef<HTMLDivElement>(null)
  const {player, volume} = useProjector()
  const onTogglemute = React.useCallback(() => {
    if (player) {
      const mute = volume === 0
      if (!mute) {
        // save the current volume, before muted
        currentVolumeRef.current = volume
      }
      player.volume = mute ? currentVolumeRef.current : 0
    }
  }, [player, volume])

  const onClickTrack = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (volumeTrackRef.current && player) {
        const track = volumeTrackRef.current
        const trackWidth = track.clientWidth
        // compat: positioning from click
        const clickFromOffset = event.pageX - (track.offsetLeft + 20)

        const clickPosition =
          clickFromOffset > trackWidth ? trackWidth : clickFromOffset

        const volumePersentation = clickPosition / 100

        player.volume = volumePersentation
      }
    },
    [player]
  )

  return (
    <div className="pcontrol-audio">
      <button onClick={onTogglemute}>
        <img src={getVolumeIcons(volume)} />
      </button>
      <div className="pcontrol-audio__volume-range">
        <div
          className="pcontrol-audio__volume-track"
          ref={volumeTrackRef}
          onClick={onClickTrack}
        >
          <div
            className="pcontrol-audio__volume-progress"
            style={{width: `${volume * 100}%`}}
          />
        </div>
      </div>
    </div>
  )
}

export default AudioControls
