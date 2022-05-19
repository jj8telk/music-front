import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import { Table } from "semantic-ui-react";

import { runApi } from "../../services/services";
import artistService from "../../services/artist.service";

import ReleaseTable from "../Release/ReleaseTable";

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
              <div style={{ marginBottom: 20 }}>
                <h3>Albums</h3>
                <ReleaseTable
                  releases={artist.releases.filter(
                    (x) => x.releaseType === "Album"
                  )}
                />
              </div>
              <div style={{ marginBottom: 20 }}>
                <h3>EPs</h3>
                <ReleaseTable
                  releases={artist.releases.filter(
                    (x) => x.releaseType === "EP"
                  )}
                />
              </div>
              <div style={{ marginBottom: 20 }}>
                <h3>Singles</h3>
                <ReleaseTable
                  releases={artist.releases.filter(
                    (x) => x.releaseType === "Single"
                  )}
                />
              </div>
              <div style={{ marginBottom: 20 }}>
                <h3>Compilations</h3>
                <ReleaseTable
                  releases={artist.releases.filter(
                    (x) => x.releaseType === "Compilation"
                  )}
                />
              </div>
              <div style={{ marginBottom: 20 }}>
                <h3>Other</h3>
                <ReleaseTable
                  releases={artist.releases.filter(
                    (x) => x.releaseType === "Unknown"
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
