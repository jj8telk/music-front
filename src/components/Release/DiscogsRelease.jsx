import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import { runApi } from "../../services/services";
import releaseService from "../../services/release.service";

import ReleaseView from "./ReleaseView";

const DiscogsRelease = ({ toggleDiscogs }) => {
  let history = useHistory();

  let { id } = useParams();
  const [release, setRelease] = useState(null);

  const [showTrackManagement, setShowTrackManagement] = useState(false);

  useEffect(() => {
    runApi(
      () => releaseService.getDiscogsModel(id),
      (data) => {
        setRelease(data);
      }
    );
  }, [id]);

  useEffect(() => {
    if (!toggleDiscogs) {
      runApi(
        () => releaseService.getReleaseIdFromDiscogsId(id),
        (data) => {
          history.push("/release/" + data);
        }
      );
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
    />
  );
};

export default DiscogsRelease;
