import { useState } from "react";
import {
  Grid,
  Table,
  Segment,
  Button,
  Icon,
  Dropdown,
} from "semantic-ui-react";

import { runApi } from "../../services/services";
import releaseService from "../../services/release.service";

import Artist from "../widgets/Artist";
import FolderTree from "../File/FolderTree";
import RenameFiles from "../File/RenameFiles";

const TrackManager = ({
  release,
  setRelease,
  refreshRelease,
  onSaveSetFolder,
}) => {
  const [toggleTrackList, setToggleTrackList] = useState(true);

  // Set Folder Methods
  const [toggleSetFolder, setToggleSetFolder] = useState(false);

  const saveFolder = (path) => {
    onSaveSetFolder(path);
    cancelFolder();
  };

  const cancelFolder = () => {
    setToggleSetFolder(false);
    setToggleTrackList(true);
  };

  // Convert WAV to FLAC
  const [toggleConvertFiles, setToggleConvertFiles] = useState(false);

  const convertFiles = () => {
    setToggleConvertFiles(true);
    runApi(
      () => releaseService.convertFiles(release.releaseId),
      (data) => {
        setToggleConvertFiles(false);
      }
    );
  };

  // Match Files Methods
  const [toggleMatchFiles, setToggleMatchFiles] = useState(false);
  const [files, setFiles] = useState(null);

  const initMatchFiles = () => {
    runApi(() => releaseService.getFileList(release.releaseId), setFiles);
  };

  const setTrackFile = (releaseTrackId, value) => {
    let r = release;
    let t = [...r.tracks];
    var file = files.filter((x) => x.fileName === value);
    t.filter((x) => x.releaseTrackId === releaseTrackId)[0].fileName =
      file[0].fileName;
    t.filter((x) => x.releaseTrackId === releaseTrackId)[0].fileSize =
      file[0].fileSize;
    r.tracks = t;
    setRelease(r);
    initMatchFiles();
  };

  const autoFindTracks = () => {
    let r = release;
    let temp = r.tracks.filter((x) => x.type === "track");
    let i = 0;
    temp.forEach((track) => {
      if (i + 1 <= files.length) {
        var file = files[i];
        track.fileName = file.fileName;
        track.fileSize = file.fileSize;
        i++;
      }
    });
    r.tracks = temp;
    setRelease(r);
    initMatchFiles();
  };

  const onSaveMatchFiles = () => {
    console.log(release.tracks);
    runApi(
      () =>
        releaseService.saveTracks(
          release.tracks.map((x) => {
            return {
              releaseTrackId: x.releaseTrackId,
              fileName: x.fileName,
              fileId: x.fileId,
              fileSize: x.fileSize,
            };
          })
        ),
      (data) => {
        setToggleMatchFiles(false);
        refreshRelease();
      }
    );
  };

  // Rename Tracks
  const [toggleRenameTracks, setToggleRenameTracks] = useState(false);

  const onSaveRenameFiles = () => {
    runApi(
      () => releaseService.renameFiles(release.releaseId),
      (data) => {
        setToggleRenameTracks(false);
        setToggleTrackList(true);
        refreshRelease();
      }
    );
  };

  // Tag Files
  const [toggleTagFiles, setToggleTagFiles] = useState(false);

  const onSaveTagFiles = () => {
    setToggleTagFiles(true);
    runApi(
      () => releaseService.tagFiles(release.releaseId),
      (data) => {
        setToggleTagFiles(false);
      }
    );
  };

  function bytesToSize(bytes) {
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes == 0) return "0 Byte";
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
  }

  return (
    <Grid columns={16}>
      <Grid.Row>
        <Grid.Column width={16}>
          <Artist release={release} />
          <h3 style={{ marginTop: 5 }}>{release.title}</h3>
          <Icon name='folder' color='yellow' />
          <span
            style={{
              fontSize: 12,
              fontFamily: "Courier New",
              fontWeight: "bold",
            }}
          >
            {release.folder}
          </span>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <div style={{ float: "left", marginRight: 10 }}>
            <Button
              size='mini'
              color='blue'
              onClick={() => {
                setToggleSetFolder(true);
                setToggleTrackList(false);
              }}
            >
              <Icon name='folder' />
              Set Folder
            </Button>
          </div>
          <div style={{ float: "left", marginRight: 10 }}>
            <Button
              size='mini'
              color='blue'
              onClick={convertFiles}
              loading={toggleConvertFiles}
            >
              <Icon name='folder' />
              Convert WAV to FLAC
            </Button>
          </div>
          <div style={{ float: "left", marginRight: 10 }}>
            <Button
              size='mini'
              color='blue'
              onClick={() => {
                setToggleMatchFiles(true);
                initMatchFiles();
              }}
            >
              <Icon name='refresh' />
              Match Files
            </Button>
          </div>
          <div style={{ float: "left", marginRight: 10 }}>
            <Button
              size='mini'
              color='blue'
              onClick={() => {
                setToggleRenameTracks(true);
                setToggleTrackList(false);
              }}
            >
              <Icon name='edit' />
              Rename Files
            </Button>
          </div>
          <div style={{ float: "left", marginRight: 10 }}>
            <Button
              size='mini'
              color='blue'
              onClick={onSaveTagFiles}
              loading={toggleTagFiles}
            >
              <Icon name='tag' />
              Tag Files
            </Button>
          </div>

          {toggleMatchFiles ? (
            <div style={{ float: "right", marginRight: 10 }}>
              <Button size='mini' color='purple' onClick={autoFindTracks}>
                <Icon name='refresh' />
                Auto Find
              </Button>
            </div>
          ) : null}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          {toggleTrackList ? (
            <div style={{ overflow: "auto", maxHeight: 700 }}>
              <Table compact size='small' selectable>
                <Table.Body>
                  {release.tracks !== null
                    ? release.tracks.map((track) => {
                        return (
                          <>
                            <Table.Row
                              key={track.releaseTrackId}
                              style={{
                                backgroundColor:
                                  track.type !== "track"
                                    ? "rgb(230,230,230)"
                                    : null,
                              }}
                            >
                              <Table.Cell>{track.position}</Table.Cell>
                              <Table.Cell>
                                {track.artists !== null
                                  ? track.artists.map((artist) => {
                                      return (
                                        <span key={artist.artistId}>
                                          {artist.anv !== ""
                                            ? artist.anv
                                            : artist.name}
                                          {artist.anv !== "" ? "*" : null}
                                        </span>
                                      );
                                    })
                                  : null}
                              </Table.Cell>
                              <Table.Cell verticalAlign='top'>
                                {track.title}
                              </Table.Cell>
                              <Table.Cell verticalAlign='top'>
                                {track.type === "track"
                                  ? new Date(track.duration * 1000)
                                      .toISOString()
                                      .substr(14, 5)
                                  : null}
                              </Table.Cell>
                              {toggleMatchFiles && track.type === "track" ? (
                                <Table.Cell verticalAlign='top'>
                                  <Dropdown
                                    style={{
                                      backgroundColor: "yellow",
                                      fontFamily: "Courier New",
                                    }}
                                    placeholder='...'
                                    options={
                                      files !== null
                                        ? files.map((x) => {
                                            return {
                                              value: x.fileName,
                                              text: x.fileName,
                                            };
                                          })
                                        : null
                                    }
                                    onChange={(e, data) => {
                                      setTrackFile(
                                        track.releaseTrackId,
                                        data.value
                                      );
                                    }}
                                    value={track.fileName}
                                  />
                                </Table.Cell>
                              ) : null}
                            </Table.Row>
                            {track.type === "track" ? (
                              <Table.Row>
                                <Table.Cell colSpan='2'></Table.Cell>
                                <Table.Cell>
                                  <span
                                    style={{
                                      fontSize: 11,
                                      fontFamily: "Courier New",
                                    }}
                                  >
                                    {track.fileName !== null ? (
                                      <>
                                        <Icon
                                          name='file outline'
                                          color='blue'
                                        />
                                        {track.fileName}
                                      </>
                                    ) : (
                                      <>
                                        <Icon name='x' color='red' />
                                        <em>file not found</em>
                                      </>
                                    )}
                                  </span>
                                </Table.Cell>
                                {track.fileName !== null ? (
                                  <Table.Cell>
                                    <span style={{ fontSize: 11 }}>
                                      {bytesToSize(track.fileSize)}
                                    </span>
                                  </Table.Cell>
                                ) : null}
                              </Table.Row>
                            ) : null}
                          </>
                        );
                      })
                    : null}
                </Table.Body>
              </Table>
            </div>
          ) : null}
          {toggleMatchFiles ? (
            <div>
              <Button color='green' size='mini' onClick={onSaveMatchFiles}>
                <Icon name='save' />
                Save Matched Files
              </Button>
              <Button
                color='white'
                size='mini'
                onClick={() => {
                  setToggleMatchFiles(false);
                }}
              >
                <Icon name='x' />
                Cancel
              </Button>
            </div>
          ) : null}
          {toggleSetFolder ? (
            <Segment>
              <FolderTree
                releasePath={release.folder ?? ""}
                onSave={saveFolder}
                onCancel={cancelFolder}
              />
            </Segment>
          ) : null}
          {toggleRenameTracks ? (
            <Segment>
              <RenameFiles
                releaseId={release.releaseId}
                onSave={onSaveRenameFiles}
                onCancel={() => {
                  setToggleRenameTracks(false);
                  setToggleTrackList(true);
                }}
              />
            </Segment>
          ) : null}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default TrackManager;
