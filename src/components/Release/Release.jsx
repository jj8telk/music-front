import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

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

import FormatDescription from "../widgets/FormatDescription";
import Genre from "../widgets/Genre";
import MatchFiles from "../File/MatchFiles";
import TrackRow from "../Track/TrackRow";

const Release = () => {
  let { id } = useParams();
  const [release, setRelease] = useState(null);

  useEffect(() => {
    runApi(() => releaseService.getModel(id), setRelease);
  }, [id]);

  return (
    <Grid columns={16}>
      {release !== null ? (
        <>
          <Grid.Row>
            <Grid.Column width={3}>
              <img src={release.images[0].uri} style={{ height: 300 }} />
            </Grid.Column>
            <Grid.Column width={7}>
              {release.artists.map((artist) => {
                return (
                  <span
                    style={{
                      marginRight: 15,
                      fontSize: 24,
                      fontWeight: "bold",
                    }}
                  >
                    <Link to={"/artist/" + artist.artistId}>
                      {artist.anv !== "" ? artist.anv : artist.name}
                    </Link>
                    {artist.anv !== "" ? "*" : null}
                  </span>
                );
              })}
              <h3 style={{ marginTop: 5 }}>{release.title}</h3>
              <div>
                {release.entities
                  .filter((x) => x.entityTypeName === "Label")
                  .map((entity) => {
                    return (
                      <Label>
                        {entity.entityName}
                        <Label.Detail>{entity.catNo}</Label.Detail>
                      </Label>
                    );
                  })}
              </div>
              <div style={{ marginTop: 10 }}>
                <Label image color='grey' basic>
                  {release.country}
                  {/* <Label.Detail>
                    <img
                      src={
                        "http://localhost:53866/Release/flag/" + release.country
                      }
                      style={{ height: 20 }}
                    />
                  </Label.Detail> */}
                </Label>
              </div>
              <div style={{ marginTop: 10 }}>
                {release.releaseDateFormatted}
              </div>
              <div style={{ marginTop: 10 }}>
                {release.formats.map((format) => {
                  return (
                    <div>
                      <FormatDescription description={format.format} />
                      {format.descriptions.map((description) => {
                        return <FormatDescription description={description} />;
                      })}
                    </div>
                  );
                })}
              </div>
              <div style={{ marginTop: 10 }}>
                {release.genres !== null
                  ? release.genres.map((genre) => {
                      return <Genre genre={genre.name} />;
                    })
                  : null}
              </div>
              <div style={{ marginTop: 10 }}>
                {release.styles !== null
                  ? release.styles.map((style) => {
                      return <Label basic>{style.name}</Label>;
                    })
                  : null}
              </div>
              <div style={{ marginTop: 10 }}>
                <a href={release.uri} target='_blank'>
                  <img
                    src='https://www.maltego.com/images/uploads/discogs-primary-logo.png'
                    style={{ height: 30 }}
                  />
                </a>
              </div>
            </Grid.Column>
            <Grid.Column width={6}>
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
          <Grid.Row>
            <Grid.Column width={8}>
              <div>
                <span style={{ fontWeight: "bold", marginRight: 10 }}>
                  Tracklist
                </span>
                <Modal
                  trigger={
                    <Icon
                      name='refresh'
                      style={{ marginRight: 10, cursor: "pointer" }}
                    />
                  }
                >
                  <Modal.Content>
                    <MatchFiles release={release} />
                  </Modal.Content>
                </Modal>
                <Icon name='pencil' style={{ marginRight: 10 }} />
                <Icon name='tag' style={{ marginRight: 10 }} />
              </div>
              <Table compact>
                <Table.Body>
                  {release.tracks.map((track) => {
                    return <TrackRow track={track} />;
                  })}
                </Table.Body>
              </Table>
            </Grid.Column>
            <Grid.Column width={4}>
              <Header as='h4' dividing>
                Credits
              </Header>
              <div>
                <List vertical>
                  {release.extraArtists !== null
                    ? release.extraArtists.map((artist) => {
                        return (
                          <>
                            <List.Item>
                              <List.Content>
                                <List.Header>
                                  <Link to={"/artist/" + artist.artistId}>
                                    {artist.name}
                                  </Link>
                                </List.Header>
                                {artist.role}
                              </List.Content>
                            </List.Item>
                          </>
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
                    ? release.entities.map((entity) => {
                        return (
                          <>
                            <List.Item>
                              <List.Content>
                                <List.Header>
                                  <Link to={"/entity/" + entity.entityId}>
                                    {entity.entityName}
                                  </Link>
                                </List.Header>
                                {entity.entityTypeName}
                              </List.Content>
                            </List.Item>
                          </>
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
                    ? release.identifiers.map((identifier) => {
                        return (
                          <>
                            <List.Item>
                              <List.Content>
                                <List.Header>{identifier.value}</List.Header>
                                {identifier.type}{" "}
                                {identifier.description !== null
                                  ? " (" + identifier.description + ")"
                                  : null}
                              </List.Content>
                            </List.Item>
                          </>
                        );
                      })
                    : null}
                </List>
              </div>
            </Grid.Column>
          </Grid.Row>
        </>
      ) : null}
    </Grid>
  );
};

export default Release;
