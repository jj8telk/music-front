import { connect } from "react-redux";
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
import { audioActions } from "../../store/actions";

import Artist from "../widgets/Artist";
import FormatDescription from "../widgets/FormatDescription";
import Genre from "../widgets/Genre";
import TrackManager from "./TrackManager";
import TrackRow from "../Track/TrackRow";

const mapDispatchToProps = (dispatch) => ({
  onBuildSongList: (release) => dispatch(audioActions.buildSongList(release)),
  onSetCurrentTrack: (track) => dispatch(audioActions.setCurrentTrack(track)),
  onSetAudioState: (audioState) =>
    dispatch(audioActions.setAudioState(audioState)),
});

const ReleaseView = (props) => {
  const buildSongList = (track) => {
    props.onBuildSongList(props.release);
    props.onSetCurrentTrack(track);
    props.onSetAudioState("play");
  };

  return (
    <Grid columns={16}>
      {props.release !== null ? (
        <>
          <Grid.Row
            style={{
              background:
                props.release.images.length > 0
                  ? "linear-gradient(10deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('" +
                    props.release.images[0].uri +
                    "') center top"
                  : "rgb(50,50,50)",
              padding: 10,
              height: 250,
            }}
          >
            <Grid.Column width={13}>
              <div
                style={{
                  bottom: 0,
                  float: "left",
                  marginRight: 10,
                }}
              >
                {props.release.images !== null ? (
                  props.release.images.length > 0 ? (
                    <div style={{ border: "1px solid #666" }}>
                      <img
                        src={props.release.images[0].uri}
                        style={{
                          maxHeight: 230,
                        }}
                        alt='artwork'
                      />
                    </div>
                  ) : null
                ) : null}
              </div>
              <div
                style={{
                  bottom: 0,
                  fontFamily: "sans-serif",
                  color: "white",
                  lineHeight: "50px",
                  textShadow: "3px 3px #000",
                  height: "100%",
                  position: "relative",
                  display: "flex",
                }}
              >
                <div style={{ display: "inline-block", alignSelf: "flex-end" }}>
                  <Link to={"/artist/" + props.release.albumArtist}>
                    <span
                      style={{
                        fontSize:
                          props.release.albumArtist.length > 70 ? 50 : 75,
                        fontWeight: "bold",
                        color: "white",
                        fontFamily: "'Oswald', sans-serif",
                      }}
                    >
                      {props.release.albumArtist}
                    </span>
                  </Link>
                  <br />
                  <span
                    style={{
                      fontSize: props.release.title.length > 70 ? 25 : 50,
                      color: "white",
                      fontFamily: "'Oswald', sans-serif",
                      textTransform: "uppercase",
                    }}
                  >
                    {props.release.title} (
                    {props.release.releaseDateFormatted !== ""
                      ? props.release.releaseDateFormatted + ", "
                      : null}
                    {props.release.country})
                  </span>
                </div>
              </div>
            </Grid.Column>
            <Grid.Column width={3} align='right'>
              <div
                style={{
                  float: "right",
                  marginRight: 10,
                  bottom: 0,
                  textAlign: "right",
                }}
              >
                <div style={{ marginBottom: 10 }}>
                  <Label
                    basic
                    size='large'
                    color={props.release.own === true ? "green" : "red"}
                  >
                    {props.release.own !== true ? (
                      "Want"
                    ) : (
                      <>
                        <Icon name='folder'></Icon>
                        {props.release.discogsFolder}
                      </>
                    )}
                  </Label>
                </div>
                {props.release.entities
                  .filter((x) => x.entityTypeName === "Label")
                  .map((entity) => {
                    return (
                      <div>
                        <Label
                          key={entity.entityId}
                          size={
                            props.release.entities.length > 2 ? "large" : "big"
                          }
                          basic
                        >
                          {entity.entityName}
                          <Label.Detail>{entity.catNo}</Label.Detail>
                        </Label>
                      </div>
                    );
                  })}
                {props.release.entities.filter(
                  (x) => x.entityTypeName === "Series"
                ).length > 0 ? (
                  <div style={{ marginTop: 10 }}>
                    {props.release.entities
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
                  <a href={props.release.uri} target='_blank' rel='noreferrer'>
                    <Label size='tiny'>
                      <img
                        src='https://www.maltego.com/images/uploads/discogs-primary-logo.png'
                        style={{ height: 10 }}
                        alt='discogs logo'
                      />
                    </Label>
                  </a>
                </div>
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row
            style={{
              backgroundColor: "rgb(240,240,240)",
              borderLeft:
                props.release.releaseType === "Album"
                  ? "25px solid #2185d0"
                  : props.release.releaseType === "EP"
                  ? "25px solid #00b5ad"
                  : props.release.releaseType === "Single" ||
                    props.release.releaseType === "Maxi-Single" ||
                    props.release.releaseType === '12"' ||
                    props.release.releaseType === '10"' ||
                    props.release.releaseType === '7"'
                  ? "25px solid #21ba45"
                  : props.release.releaseType === "Compilation"
                  ? "25px solid #fbbd08"
                  : null,
            }}
          >
            <Grid.Column width={5}>
              {props.release.formats !== null
                ? props.release.formats.map((format, idx) => {
                    return (
                      <>
                        <div style={{ float: "left" }}>
                          <img
                            src={
                              process.env.REACT_APP_CORE_API +
                              "Release/formatIcon/" +
                              format.format
                            }
                            style={{ maxHeight: 70, marginRight: 10 }}
                          />
                        </div>
                        <div
                          style={{
                            fontSize: 40,
                            textTransform: "uppercase",
                            fontFamily: "Verdana",
                            float: "left",
                            marginTop: 10,
                          }}
                        >
                          <Label size='massive'>
                            {format.qty > 1 ? <span>{format.qty}x</span> : null}
                            {format.format}
                            {format.text !== null ? (
                              <Label.Detail>{format.text}</Label.Detail>
                            ) : null}
                            {format.descriptions !== null
                              ? format.descriptions
                                  .filter(
                                    (x) =>
                                      x === '12"' ||
                                      x === '10"' ||
                                      x === '7"' ||
                                      x === "45 RPM" ||
                                      x === "33 ⅓ RPM"
                                  )
                                  .map((description, idx) => {
                                    return <span>{", " + description}</span>;
                                  })
                              : null}
                          </Label>
                        </div>
                      </>
                    );
                  })
                : null}
            </Grid.Column>
            <Grid.Column width={11}>
              <div style={{ float: "left", marginRight: 10, marginTop: 15 }}>
                {props.release.formats !== null
                  ? props.release.formats.map((format, idx) => {
                      return (
                        <div key={idx} style={{ marginBottom: 5 }}>
                          {format.descriptions !== null
                            ? format.descriptions
                                .filter(
                                  (x) =>
                                    x !== "Album" &&
                                    x !== "Single" &&
                                    x !== "Maxi-Single" &&
                                    x !== "Compilation" &&
                                    x !== '12"' &&
                                    x !== '10"' &&
                                    x !== '7"' &&
                                    x !== "45 RPM" &&
                                    x !== "33 ⅓ RPM"
                                )
                                .map((description, idx) => {
                                  return (
                                    <FormatDescription
                                      key={idx}
                                      description={description}
                                      size='big'
                                    />
                                  );
                                })
                            : null}
                        </div>
                      );
                    })
                  : null}
              </div>
              <div style={{ float: "right", paddingRight: 20 }}>
                <div style={{ textAlign: "right" }}>
                  {props.release.genres !== null
                    ? props.release.genres.map((genre) => {
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
                  style={{
                    marginTop: 10,
                    marginBottom: 15,
                    textAlign: "right",
                  }}
                >
                  {props.release.styles !== null
                    ? props.release.styles.map((style) => {
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
              </div>
            </Grid.Column>
          </Grid.Row>
          {/* <Grid.Row>
            <Grid.Column width={3}>
              {props.release.images !== null ? (
                props.release.images.length > 0 ? (
                  <img
                    src={props.release.images[0].uri}
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
                    <Artist release={props.release} />
                    <h3 style={{ marginTop: 5 }}>{props.release.title}</h3>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={16}>
                    <div>
                      {props.release.entities
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
                    {props.release.entities.filter(
                      (x) => x.entityTypeName === "Series"
                    ).length > 0 ? (
                      <div style={{ marginTop: 10 }}>
                        {props.release.entities
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
                      {props.release.releaseDateFormatted} &mdash;
                      {props.release.country}
                    </div>
                    <div style={{ marginTop: 10 }}>
                      {props.release.formats !== null
                        ? props.release.formats.map((format, idx) => {
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
                <a href={props.release.uri} target='_blank' rel='noreferrer'>
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
                {props.release.genres !== null
                  ? props.release.genres.map((genre) => {
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
                {props.release.styles !== null
                  ? props.release.styles.map((style) => {
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
                <Label
                  basic
                  color={props.release.own === true ? "green" : "red"}
                >
                  {props.release.own !== true ? (
                    "Want"
                  ) : (
                    <>
                      <Icon name='folder'></Icon>
                      {props.release.discogsFolder}
                    </>
                  )}
                </Label>
              </div>
            </Grid.Column>
          </Grid.Row> */}
          <Grid.Row style={{ paddingLeft: 20, paddingRight: 20 }}>
            <Grid.Column width={8}>
              <div>
                <span style={{ fontWeight: "bold", marginRight: 10 }}>
                  Tracklist
                </span>
                <Icon
                  name='hdd'
                  style={{ cursor: "pointer" }}
                  onClick={() => props.setShowTrackManagement(true)}
                />
                <Modal
                  open={props.showTrackManagement}
                  onClose={() => props.setShowTrackManagement(false)}
                >
                  <Modal.Content>
                    <TrackManager
                      release={props.release}
                      setRelease={props.setRelease}
                      refreshRelease={() => {
                        runApi(
                          () =>
                            releaseService.getModel(props.release.releaseId),
                          (data) => {
                            props.setRelease(data);
                          }
                        );
                      }}
                      onSaveSetFolder={props.saveFolder}
                    />
                  </Modal.Content>
                </Modal>
              </div>
              <Table compact>
                <Table.Body>
                  {props.release.tracks.map((track) => {
                    return (
                      <TrackRow
                        key={track.releaseTrackId}
                        track={track}
                        playTrack={buildSongList}
                        pauseTrack={() => props.onSetAudioState("pause")}
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
                {props.release.extraArtists !== null
                  ? props.release.extraArtists
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
                {props.release.extraArtists !== null
                  ? props.release.extraArtists
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
                {props.release.extraArtists !== null
                  ? props.release.extraArtists
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
                {props.release.extraArtists !== null
                  ? props.release.extraArtists
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
                  {props.release.extraArtists !== null
                    ? props.release.extraArtists
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
                  {props.release.entities !== null
                    ? props.release.entities
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
                  {props.release.identifiers !== null
                    ? props.release.identifiers.map((identifier, idx) => {
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
          <Grid.Row style={{ paddingLeft: 20, paddingRight: 20 }}>
            <Grid.Column width={16}>
              {props.release.notes !== null ? (
                <>
                  <Header as='h4' dividing>
                    Notes
                  </Header>
                  <div
                    dangerouslySetInnerHTML={{ __html: props.release.notes }}
                  />
                </>
              ) : null}
            </Grid.Column>
          </Grid.Row>
        </>
      ) : null}
    </Grid>
  );
};

export default connect(() => ({}), mapDispatchToProps)(ReleaseView);
