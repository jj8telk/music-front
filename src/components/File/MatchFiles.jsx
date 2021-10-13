import { useState, useEffect } from "react";
import { Table, Select } from "semantic-ui-react";

const MatchFiles = ({ release }) => {
  const [tracks, setTracks] = useState(null);
  const [files, setFiles] = useState(null);

  useEffect(() => {
    setTracks(release.tracks);
  }, []);

  return (
    <Table>
      {tracks !== null
        ? tracks.map((track) => {
            return (
              <Table.Row>
                <Table.Cell>{track.position}</Table.Cell>
                <Table.Cell>
                  {track.artists !== null
                    ? track.artists.map((artist) => {
                        return (
                          <>
                            {artist.anv !== "" ? artist.anv : artist.name}
                            {artist.anv !== "" ? "*" : null}
                          </>
                        );
                      })
                    : null}
                </Table.Cell>
                <Table.Cell verticalAlign='top'>{track.title}</Table.Cell>
                <Table.Cell verticalAlign='top'>
                  {track.type === "track"
                    ? new Date(track.duration * 1000)
                        .toISOString()
                        .substr(14, 5)
                    : null}
                </Table.Cell>
                <Table.Cell verticalAlign='top'>
                  <Select placeholder='...' options={files} />
                </Table.Cell>
              </Table.Row>
            );
          })
        : null}
    </Table>
  );
};

export default MatchFiles;
