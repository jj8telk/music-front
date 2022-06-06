import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import { Table } from "semantic-ui-react";

import { runApi } from "../../services/services";
import artistService from "../../services/artist.service";

import ReleaseTable from "../Release/ReleaseTable";
import ReleaseBlock from "../Release/ReleaseBlock";

const Artist = ({ toggleDiscogs }) => {
  let { name } = useParams();
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    runApi(
      () => artistService.getModel(name),
      (data) => {
        setArtist(data);
      }
    );
  }, [name]);

  return (
    <>
      {artist !== null ? (
        <div>
          <h1>{artist.name}</h1>
          {artist.releases !== null ? (
            <>
              <div style={{ marginBottom: 20, clear: "left" }}>
                <h3>Albums</h3>
                <ReleaseBlock
                  releases={artist.releases.filter(
                    (x) => x.releaseType === "Album" && x.own
                  )}
                />
              </div>
              <div style={{ marginBottom: 20, clear: "left" }}>
                <h3>EPs</h3>
                <ReleaseBlock
                  releases={artist.releases.filter(
                    (x) => x.releaseType === "EP" && x.own
                  )}
                />
              </div>
              <div style={{ marginBottom: 20, clear: "left" }}>
                <h3>Singles</h3>
                <ReleaseBlock
                  releases={artist.releases.filter(
                    (x) => x.releaseType === "Single" && x.own
                  )}
                />
              </div>
              <div style={{ marginBottom: 20, clear: "left" }}>
                <h3>Compilations</h3>
                <ReleaseBlock
                  releases={artist.releases.filter(
                    (x) => x.releaseType === "Compilation" && x.own
                  )}
                />
              </div>
              <div style={{ marginBottom: 20, clear: "left" }}>
                <h3>Other</h3>
                <ReleaseBlock
                  releases={artist.releases.filter(
                    (x) => x.releaseType === "Unknown" && x.own
                  )}
                />
              </div>
            </>
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default Artist;
