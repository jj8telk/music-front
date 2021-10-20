import { useState, useEffect } from "react";
import { Table, Select, Button, Icon } from "semantic-ui-react";

import { runApi } from "../../services/services";
import releaseService from "../../services/release.service";

const MatchFiles = ({ release, onSave }) => {
  const [tracks, setTracks] = useState(null);
  const [files, setFiles] = useState(null);

  useEffect(() => {
    setTracks(release.tracks);
    runApi(() => releaseService.getFileList(release.releaseId), buildFiles);
  }, []);

  const buildFiles = (data) => {
    setFiles(data);
  };

  const setTrackFile = (releaseTrackId, value) => {
    let t = [...tracks];
    t.filter((x) => x.releaseTrackId === releaseTrackId)[0].fileName = value;
    setTracks(t);
  };

  const autoFind = () => {
    let temp = tracks;
    temp.forEach((track) => {
      var file = files.filter((x) => x.fileName.indexOf(track.title) > 0);
      if (file.length > 0) {
        track.fileName = file[0].fileName;
        track.fileSize = file[0].fileSize;
      }
    });

    setTracks(temp);
  };

  const saveTracks = () => {
    runApi(
      () =>
        releaseService.saveTracks(
          tracks.map((x) => {
            return {
              releaseTrackId: x.releaseTrackId,
              fileName: x.fileName,
              fileId: x.fileId,
              fileSize: x.fileSize,
            };
          })
        ),
      onSave
    );
  };

  return (
    <>
      <Button color='blue' onClick={autoFind}>
        <Icon name='refresh' />
        Auto Find
      </Button>
      <Table>
        <Table.Body>
          {tracks !== null
            ? tracks.map((track) => {
                return (
                  <Table.Row key={track.releaseTrackId}>
                    <Table.Cell>{track.position}</Table.Cell>
                    <Table.Cell>
                      {track.artists !== null
                        ? track.artists.map((artist) => {
                            return (
                              <span key={artist.artistId}>
                                {artist.anv !== "" ? artist.anv : artist.name}
                                {artist.anv !== "" ? "*" : null}
                              </span>
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
                      <Select
                        placeholder='...'
                        options={
                          files !== null
                            ? files.map((x) => {
                                return { value: x.fileName, text: x.fileName };
                              })
                            : null
                        }
                        onChange={(e, data) => {
                          setTrackFile(track.releaseTrackId, data.value);
                        }}
                        value={track.fileName}
                      />
                    </Table.Cell>
                  </Table.Row>
                );
              })
            : null}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.Cell colspan='4'>
              <Button color='green' onClick={saveTracks}>
                Save
              </Button>
            </Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </>
  );
};

export default MatchFiles;
