import { Link } from "react-router-dom";
import {
  Grid,
  Table,
  Label,
  Header,
  List,
  Icon,
  Modal,
} from "semantic-ui-react";

import { runApi } from "../../services/services";
import releaseService from "../../services/release.service";

import Artist from "../widgets/Artist";
import FormatDescription from "../widgets/FormatDescription";
import Genre from "../widgets/Genre";
import TrackManager from "./TrackManager";
import TrackRow from "../Track/TrackRow";

const ReleaseView = ({
  release,
  setRelease,
  showTrackManagement,
  setShowTrackManagement,
  saveFolder,
  addToPlaylist,
  setCurrentTrack,
  currentTrack,
  setPlayState,
  playState,
}) => {
  return (
    <Grid columns={16}>
      {release !== null ? (
        <>
          <Grid.Row>
            <Grid.Column width={3}>
              {release.images !== null ? (
                release.images.length > 0 ? (
                  <img
                    src={release.images[0].uri}
                    style={{ height: 300 }}
                    alt='artwork'
                  />
                ) : null
              ) : null}
            </Grid.Column>
            <Grid.Column width={7}>
              <Grid columns={16}>
                <Grid.Row>
                  <Grid.Column width={16}>
                    <Artist release={release} />
                    <h3 style={{ marginTop: 5 }}>{release.title}</h3>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={16}>
                    <div>
                      {release.entities
                        .filter((x) => x.entityTypeName === "Label")
                        .map((entity) => {
                          return (
                            <Label key={entity.entityId}>
                              {entity.entityName}
                              <Label.Detail>{entity.catNo}</Label.Detail>
                            </Label>
                          );
                        })}
                    </div>
                    {release.entities.filter(
                      (x) => x.entityTypeName === "Series"
                    ).length > 0 ? (
                      <div style={{ marginTop: 10 }}>
                        {release.entities
                          .filter((x) => x.entityTypeName === "Series")
                          .map((entity) => {
                            return (
                              <Label key={entity.entityId} basic>
                                {entity.entityName}
                                {entity.catNo !== null ? (
                                  <Label.Detail>{entity.catNo}</Label.Detail>
                                ) : null}
                              </Label>
                            );
                          })}
                      </div>
                    ) : null}
                    <div style={{ marginTop: 10 }}>
                      {release.releaseDateFormatted} &mdash;{release.country}
                    </div>
                    <div style={{ marginTop: 10 }}>
                      {release.formats !== null
                        ? release.formats.map((format, idx) => {
                            return (
                              <div key={idx} style={{ marginBottom: 5 }}>
                                <Label image>
                                  <img
                                    src={
                                      process.env.REACT_APP_CORE_API +
                                      "Release/formatIcon/" +
                                      format.format
                                    }
                                  />
                                  {format.qty > 1 ? (
                                    <span>{format.qty}x</span>
                                  ) : null}
                                  {format.format}
                                  {format.text !== null ? (
                                    <Label.Detail>{format.text}</Label.Detail>
                                  ) : null}
                                </Label>
                                {format.descriptions !== null
                                  ? format.descriptions.map(
                                      (description, idx) => {
                                        return (
                                          <FormatDescription
                                            key={idx}
                                            description={description}
                                          />
                                        );
                                      }
                                    )
                                  : null}
                              </div>
                            );
                          })
                        : null}
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <div style={{ marginTop: 10 }}>
                <a href={release.uri} target='_blank' rel='noreferrer'>
                  <img
                    src='https://www.maltego.com/images/uploads/discogs-primary-logo.png'
                    style={{ height: 30 }}
                    alt='discogs logo'
                  />
                </a>
              </div>
            </Grid.Column>
            <Grid.Column width={6} textAlign='right'>
              <div style={{ textAlign: "right" }}>
                {release.genres !== null
                  ? release.genres.map((genre) => {
                      return (
                        <Genre
                          key={genre.genreId}
                          genre={genre.name}
                          size='large'
                        />
                      );
                    })
                  : null}
              </div>
              <div
                style={{ marginTop: 10, marginBottom: 15, textAlign: "right" }}
              >
                {release.styles !== null
                  ? release.styles.map((style) => {
                      return (
                        <span
                          key={style.styleId}
                          style={{ marginRight: 20, fontSize: 13 }}
                        >
                          {style.name}
                        </span>
                      );
                    })
                  : null}
              </div>
              <div
                style={{ marginTop: 10, marginBottom: 15, textAlign: "right" }}
              >
                <Label basic color={release.own === true ? "green" : "red"}>
                  {release.own !== true ? (
                    "Want"
                  ) : (
                    <>
                      <Icon name='folder'></Icon>
                      {release.discogsFolder}
                    </>
                  )}
                </Label>
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>
              <div>
                <span style={{ fontWeight: "bold", marginRight: 10 }}>
                  Tracklist
                </span>
                <Icon
                  name='hdd'
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowTrackManagement(true)}
                />
                <Modal
                  open={showTrackManagement}
                  onClose={() => setShowTrackManagement(false)}
                >
                  <Modal.Content>
                    <TrackManager
                      release={release}
                      setRelease={setRelease}
                      refreshRelease={() => {
                        runApi(
                          () => releaseService.getModel(release.releaseId),
                          (data) => {
                            setRelease(data);
                          }
                        );
                      }}
                      onSaveSetFolder={saveFolder}
                    />
                  </Modal.Content>
                </Modal>
              </div>
              <Table compact>
                <Table.Body>
                  {release.tracks.map((track) => {
                    return (
                      <TrackRow
                        key={track.releaseTrackId}
                        track={track}
                        addToPlaylist={addToPlaylist}
                        setCurrentTrack={setCurrentTrack}
                        currentTrack={currentTrack}
                        setPlayState={setPlayState}
                        playState={playState}
                      />
                    );
                  })}
                </Table.Body>
              </Table>
            </Grid.Column>
            <Grid.Column width={4}>
              <Header as='h4' dividing>
                Writing
              </Header>
              <div style={{ overflow: "auto" }}>
                {release.extraArtists !== null
                  ? release.extraArtists
                      .filter((x) => x.categoryName === "writing")
                      .map((artist, idx) => {
                        return (
                          <div
                            key={idx}
                            style={{
                              float: "left",
                              minWidth: 200,
                              padding: 5,
                              border: "1px solid #ccc",
                              margin: "0 5px 5px 0",
                              fontSize: 13,
                            }}
                          >
                            <strong>
                              <Link to={"/artist/" + artist.artistId}>
                                {artist.name}
                              </Link>
                              <br />
                              {artist.role}{" "}
                              {artist.description !== null ? (
                                <span style={{ fontSize: 12 }}>
                                  {" [" + artist.description + "]"}
                                </span>
                              ) : null}
                            </strong>
                          </div>
                        );
                      })
                  : null}
              </div>
              <Header as='h4' dividing>
                Production
              </Header>
              <div style={{ overflow: "auto" }}>
                {release.extraArtists !== null
                  ? release.extraArtists
                      .filter(
                        (x) =>
                          x.categoryName === "production" ||
                          x.categoryName === "remix"
                      )
                      .map((artist, idx) => {
                        return (
                          <div
                            key={idx}
                            style={{
                              float: "left",
                              minWidth: 200,
                              padding: 5,
                              border: "1px solid #ccc",
                              margin: "0 5px 5px 0",
                              fontSize: 13,
                            }}
                          >
                            <strong>
                              <Link to={"/artist/" + artist.artistId}>
                                {artist.name}
                              </Link>
                              <br />
                              {artist.role}{" "}
                              {artist.description !== null ? (
                                <span style={{ fontSize: 12 }}>
                                  {" [" + artist.description + "]"}
                                </span>
                              ) : null}
                            </strong>
                          </div>
                        );
                      })
                  : null}
              </div>
              <Header as='h4' dividing>
                Performance
              </Header>
              <div style={{ overflow: "auto" }}>
                {release.extraArtists !== null
                  ? release.extraArtists
                      .filter((x) => x.categoryName === "performance")
                      .map((artist, idx) => {
                        return (
                          <div
                            key={idx}
                            style={{
                              float: "left",
                              minWidth: 200,
                              padding: 5,
                              border: "1px solid #ccc",
                              margin: "0 5px 5px 0",
                              fontSize: 13,
                            }}
                          >
                            <strong>
                              <Link to={"/artist/" + artist.artistId}>
                                {artist.name}
                              </Link>
                              <br />
                              {artist.role}{" "}
                              {artist.description !== null ? (
                                <span style={{ fontSize: 12 }}>
                                  {" [" + artist.description + "]"}
                                </span>
                              ) : null}
                            </strong>
                          </div>
                        );
                      })
                  : null}
              </div>
              <Header as='h4' dividing>
                Artwork
              </Header>
              <div style={{ overflow: "auto" }}>
                {release.extraArtists !== null
                  ? release.extraArtists
                      .filter((x) => x.categoryName === "artwork")
                      .map((artist, idx) => {
                        return (
                          <div
                            key={idx}
                            style={{
                              float: "left",
                              minWidth: 200,
                              padding: 5,
                              border: "1px solid #ccc",
                              margin: "0 5px 5px 0",
                              fontSize: 13,
                            }}
                          >
                            <strong>
                              <Link to={"/artist/" + artist.artistId}>
                                {artist.name}
                              </Link>
                              <br />
                              {artist.role}{" "}
                              {artist.description !== null ? (
                                <span style={{ fontSize: 12 }}>
                                  {" [" + artist.description + "]"}
                                </span>
                              ) : null}
                            </strong>
                          </div>
                        );
                      })
                  : null}
              </div>
              <Header as='h4' dividing>
                Other Credits
              </Header>
              <div>
                <List vertical>
                  {release.extraArtists !== null
                    ? release.extraArtists
                        .filter((x) => x.categoryName === "other")
                        .map((artist, idx) => {
                          return (
                            <List.Item key={idx}>
                              <List.Content>
                                <List.Header>
                                  <Link to={"/artist/" + artist.artistId}>
                                    {artist.name}
                                  </Link>
                                </List.Header>
                                {artist.role}{" "}
                                {artist.description !== null
                                  ? " [" + artist.description + "]"
                                  : null}
                              </List.Content>
                            </List.Item>
                          );
                        })
                    : null}
                </List>
              </div>
            </Grid.Column>
            <Grid.Column width={4}>
              <Header as='h4' dividing>
                Companies
              </Header>
              <div>
                <List vertical>
                  {release.entities !== null
                    ? release.entities
                        .filter(
                          (x) =>
                            x.entityTypeName !== "Label" &&
                            x.entityTypeName !== "Series"
                        )
                        .map((entity, idx) => {
                          return (
                            <List.Item key={idx}>
                              <List.Content>
                                <List.Header>
                                  <Link to={"/entity/" + entity.entityId}>
                                    {entity.entityName}
                                  </Link>
                                </List.Header>
                                {entity.entityTypeName}
                              </List.Content>
                            </List.Item>
                          );
                        })
                    : null}
                </List>
              </div>
              <Header as='h4' dividing>
                Identifiers
              </Header>
              <div>
                <List vertical>
                  {release.identifiers !== null
                    ? release.identifiers.map((identifier, idx) => {
                        return (
                          <List.Item key={idx}>
                            <List.Content>
                              <List.Header>{identifier.value}</List.Header>
                              {identifier.type}{" "}
                              {identifier.description !== null
                                ? " (" + identifier.description + ")"
                                : null}
                            </List.Content>
                          </List.Item>
                        );
                      })
                    : null}
                </List>
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              {release.notes !== null ? (
                <>
                  <Header as='h4' dividing>
                    Notes
                  </Header>
                  <div dangerouslySetInnerHTML={{ __html: release.notes }} />
                </>
              ) : null}
            </Grid.Column>
          </Grid.Row>
        </>
      ) : null}
    </Grid>
  );
};

export default ReleaseView;
