import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import { runApi } from "../../services/services";
import releaseService from "../../services/release.service";

import ReleaseView from "./ReleaseView";

const Release = ({
  toggleDiscogs,
  addToPlaylist,
  setCurrentTrack,
  currentTrack,
  setPlayState,
  playState,
}) => {
  let history = useHistory();

  let { id } = useParams();
  const [release, setRelease] = useState(null);

  const [showTrackManagement, setShowTrackManagement] = useState(false);

  useEffect(() => {
    runApi(
      () => releaseService.getModel(id),
      (data) => {
        setRelease(data);
      }
    );
  }, [id]);

  useEffect(() => {
    if (toggleDiscogs) {
      history.push("/discogsRelease/" + release.discogsId);
    }
  }, [toggleDiscogs]);

  const saveFolder = (folder) => {
    let temp = release;
    temp.folder = folder;

    runApi(
      () => releaseService.saveModel(temp),
      (data) => {
        setRelease(data);
      }
    );
  };

  return (
    <ReleaseView
      release={release}
      setRelease={setRelease}
      showTrackManagement={showTrackManagement}
      setShowTrackManagement={setShowTrackManagement}
      saveFolder={saveFolder}
      addToPlaylist={addToPlaylist}
      setCurrentTrack={setCurrentTrack}
      currentTrack={currentTrack}
      setPlayState={setPlayState}
      playState={playState}
    />
  );
};

export default Release;
