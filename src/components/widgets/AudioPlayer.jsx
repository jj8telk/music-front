import { useEffect, useState } from "react";
import { Icon } from "semantic-ui-react";

const AudioPlayer = ({
  releaseTrack,
  playlist,
  setAudio,
  loadAudio,
  playAudio,
  pauseAudio,
  stopAudio,
  setPlayState,
  playState,
  currentTrack,
}) => {
  //   const [audio, setAudio] = useState(null);
  //   const [playState, setPlayState] = useState("stop");

  //   useEffect(() => {
  //     console.log("state changed");
  //     if (audio !== null) {
  //       if (playState === "play") audio.play();
  //       else audio.pause();
  //     }
  //   }, [playState]);

  //   const loadAudio = () => {
  //     if (playlist.length > 0) {
  //       var url =
  //         "https://localhost:5001/Release/audio?releaseTrackId=" +
  //         playlist[0].releaseTrackId;
  //       setAudio(new Audio(url));
  //     }
  //   };

  //   const playAudio = () => {
  //     setPlayState("play");
  //     loadAudio();
  //   };

  //   const pauseAudio = () => {
  //     setPlayState("pause");
  //     if (audio !== null) audio.pause();
  //   };

  //   const stopAudio = () => {
  //     setPlayState("stop");
  //     if (audio !== null) audio.pause();
  //   };

  return (
    <div>
      {currentTrack !== null ? (
        <>
          <div style={{ float: "left", marginTop: 10 }}>
            <Icon
              name='play'
              onClick={playAudio}
              color={playState === "play" ? "green" : "black"}
              size='large'
            />
            <Icon name='pause' onClick={pauseAudio} size='large' />
            <Icon name='stop' onClick={stopAudio} size='large' />
          </div>
          <div style={{ float: "right", marginLeft: 10 }}>
            <>
              <div style={{ float: "left", margin: "0 10px 0 0" }}>
                <img src={currentTrack.coverArtUrl} style={{ maxHeight: 40 }} />
              </div>
              <div
                style={{
                  marginTop: 0,
                  float: "right",
                  lineHeight: "20px",
                }}
              >
                <span style={{ fontSize: 16 }}>
                  <strong>{currentTrack.release.albumArtist}</strong>
                  &nbsp;&nbsp;
                  {currentTrack.title}
                </span>
                <br />
                <span style={{ fontStyle: "italic", fontSize: 14 }}>
                  <strong>{currentTrack.release.title}</strong> (
                  {currentTrack.release.folder.split("\\")[2].replace("'", '"')}
                  )
                </span>
              </div>
            </>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default AudioPlayer;
