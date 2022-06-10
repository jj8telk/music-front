import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";

import { Icon } from "semantic-ui-react";

import { audioActions } from "../../store/actions";

const mapStateToProps = (state) => ({
  audio: state.audio,
});

const mapDispatchToProps = (dispatch) => ({
  onSetAudioState: (audioState) =>
    dispatch(audioActions.setAudioState(audioState)),
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

  return (
    <div style={{ width: "100%" }}>
      <audio
        src={
          "http://localhost:5000/Release/audio?releaseTrackId=" +
          props.audio.currentTrack.releaseTrackId
        }
        ref={audioEl}
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
      <div style={{ float: "right", lineHeight: "20px" }}></div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioPlayer);
