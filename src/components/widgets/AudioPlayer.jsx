import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";

import { Icon, Progress } from "semantic-ui-react";

import { audioActions } from "../../store/actions";

const mapStateToProps = (state) => ({
  audio: state.audio,
});

const mapDispatchToProps = (dispatch) => ({
  onSetAudioState: (audioState) =>
    dispatch(audioActions.setAudioState(audioState)),
  onSkipBackward: () => dispatch(audioActions.skipBackward()),
  onSkipForward: () => dispatch(audioActions.skipForward()),
  onSetCurrentTime: (time, duration) =>
    dispatch(audioActions.setCurrentTime(time, duration)),
  onScrubTime: (time) => dispatch(audioActions.scrubTime(time)),
});

function AudioPlayer(props) {
  const audioEl = useRef(null);

  useEffect(() => {
    if (audioEl.current !== null) {
      if (props.audio.isPlaying) {
        audioEl.current.play();
      } else {
        audioEl.current.pause();
      }
    }
  });

  const timeUpdate = () => {
    props.onSetCurrentTime(
      audioEl.current.currentTime,
      audioEl.current.duration
    );
  };

  const onScrub = (time) => {
    props.onSetAudioState("pause");
    props.onSetCurrentTime(time, audioEl.current.duration);
    audioEl.current.currentTime = props.audio.trackData.currentTime;
    props.onSetAudioState("play");
  };

  return props.audio.currentTrack !== undefined &&
    props.audio.currentTrack !== null ? (
    <div style={{ width: "100%" }}>
      <audio
        src={
          "http://localhost:5000/Release/audio?releaseTrackId=" +
          props.audio.currentTrack.releaseTrackId
        }
        ref={audioEl}
        onEnded={props.onSkipForward}
        onTimeUpdate={timeUpdate}
      ></audio>
      <div style={{ float: "left", marginTop: 7, marginRight: 10 }}>
        {props.audio.isPlaying ? (
          <Icon
            name='pause'
            size='large'
            onClick={() => props.onSetAudioState("pause")}
          />
        ) : (
          <Icon
            name='play'
            size='large'
            onClick={() => props.onSetAudioState("play")}
          />
        )}
        <Icon
          name='fast backward'
          size='large'
          onClick={() => props.onSkipBackward()}
        />
        <Icon
          name='fast forward'
          size='large'
          onClick={() => props.onSkipForward()}
        />
      </div>
      {props.audio.release.images.length > 0 ? (
        <div style={{ float: "left", marginRight: 15 }}>
          <img
            src={props.audio.release.images[0].uri}
            style={{ height: 40 }}
            alt='artwork'
            align='left'
          />
        </div>
      ) : null}
      <div style={{ float: "left", lineHeight: "20px", marginRight: 15 }}>
        <span>
          <strong>{props.audio.currentTrack.title}</strong> by{" "}
          {props.audio.release.albumArtist}
        </span>
        <br />
        <span style={{ fontStyle: "italic", fontSize: 13 }}>
          {props.audio.release.title} (
          {props.audio.release.folder.split("\\")[2]})
        </span>
      </div>
      <div
        style={{
          float: "left",
          width: "300px",
          marginRight: 15,
          paddingTop: 10,
        }}
      >
        {/* <Progress
          percent={
            (props.audio.trackData.currentTime /
              props.audio.trackData.duration) *
            100
          }
          size='small'
        /> */}

        <input
          type='range'
          value={props.audio.trackData.currentTime}
          step='1'
          min='0'
          max={props.audio.trackData.duration}
          style={{ width: "100%" }}
          onChange={(e) => onScrub(e.target.value)}
        />
      </div>
      <div
        style={{ float: "left", marginRight: 15, paddingTop: 10, fontSize: 13 }}
      >
        {props.audio.trackData.currentTimeFormatted} /{" "}
        {props.audio.trackData.durationFormatted}
      </div>
    </div>
  ) : null;
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioPlayer);
