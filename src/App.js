import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { runApi } from "./services/services";
import releaseService from "./services/release.service";

import Layout from "./components/Layout/Layout";

import Artists from "./components/Artist/Artists";
import Artist from "./components/Artist/Artist";
import Release from "./components/Release/Release";
import DiscogsRelease from "./components/Release/DiscogsRelease";
import Releases from "./components/Release/Releases";

function App() {
  require("dotenv").config();

  const [toggleDiscogs, setToggleDiscogs] = useState(false);
  const [audio, setAudio] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [playState, setPlayState] = useState("stop");

  const addToPlaylist = (releaseTrackId, playNow = false) => {
    runApi(
      () => releaseService.getReleaseTrack(releaseTrackId),
      (data) => {
        if (playNow) {
          setPlaylist([data]);
        } else {
          let p = [...playlist];
          p.push(data);
          setPlaylist(p);
        }
      }
    );
  };

  useEffect(() => {
    if (audio !== null) {
      if (playState === "play") audio.play();
      else audio.pause();
    }
  }, [playState]);

  useEffect(() => {
    if (currentTrack !== null) {
      var url =
        "https://localhost:5001/Release/audio?releaseTrackId=" +
        currentTrack.releaseTrackId;
      setAudio(new Audio(url));
    }
  }, [currentTrack]);

  const loadAudio = () => {
    if (playlist.length > 0) {
      setCurrentTrack(playlist[0]);
    }
  };

  const playAudio = () => {
    setPlayState("play");
    if (audio !== null) audio.play();
  };

  const pauseAudio = () => {
    setPlayState("pause");
    if (audio !== null) audio.pause();
  };

  const stopAudio = () => {
    setPlayState("stop");
    if (audio !== null) audio.pause();
    setAudio(null);
    setCurrentTrack(null);
  };

  return (
    <Router>
      <Layout
        toggleDiscogs={toggleDiscogs}
        setToggleDiscogs={setToggleDiscogs}
        playlist={playlist}
        setAudio={setAudio}
        loadAudio={loadAudio}
        playAudio={playAudio}
        pauseAudio={pauseAudio}
        stopAudio={stopAudio}
        setPlayState={setPlayState}
        playState={playState}
        currentTrack={currentTrack}
      >
        <Switch>
          <Route
            exact
            path='/artists'
            children={<Artists toggleDiscogs={toggleDiscogs} />}
          ></Route>
          <Route
            exact
            path='/artist/:name'
            children={<Artist toggleDiscogs={toggleDiscogs} />}
          ></Route>
          <Route
            exact
            path='/release/:id'
            children={
              <Release
                toggleDiscogs={toggleDiscogs}
                addToPlaylist={addToPlaylist}
                setCurrentTrack={setCurrentTrack}
                currentTrack={currentTrack}
                setPlayState={setPlayState}
                playState={playState}
              />
            }
          ></Route>
          <Route
            exact
            path='/discogsRelease/:id'
            children={<DiscogsRelease toggleDiscogs={toggleDiscogs} />}
          ></Route>
          <Route
            exact
            path='/releases'
            children={<Releases toggleDiscogs={toggleDiscogs} />}
          ></Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
