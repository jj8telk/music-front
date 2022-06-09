import { Link } from "react-router-dom";
import { Table, Icon } from "semantic-ui-react";

import { runApi } from "../../services/services";
import releaseService from "../../services/release.service";

const TrackRow = ({ track }) => {
  return (
    <Table.Row
      style={
        track.type === "heading"
          ? {
              backgroundColor: "lightgrey",
              fontWeight: "bold",
            }
          : track.type === "index"
          ? { fontWeight: "bold", backgroundColor: "#efefef" }
          : track.type === "track" && track.parentId > 0
          ? { backgroundColor: "rgb(245,245,245)" }
          : track.type === "track" && track.fileId !== null
          ? { backgroundColor: "rgb(230,255,255)" }
          : {}
      }
    >
      <Table.Cell verticalAlign='top'>
        {track.type == "track" ? (
          track.fileId !== null ? (
            <>
              <Icon name='play' color='green' style={{ marginRight: 10 }} />
              {!track.fileNamed ? (
                <Icon name='exclamation circle' color='yellow' />
              ) : null}
            </>
          ) : (
            <Icon name='x' color='red' />
          )
        ) : null}
      </Table.Cell>
      <Table.Cell verticalAlign='top'>{track.position}</Table.Cell>
      <Table.Cell verticalAlign='top'>
        {track.artists !== null
          ? track.artists.map((artist, idx) => {
              return (
                <div key={idx}>
                  <Link to={"/artist/" + artist.artistId}>
                    {artist.anv !== null ? artist.anv : artist.name}
                  </Link>
                  {artist.anv !== null ? "*" : null}
                </div>
              );
            })
          : null}
      </Table.Cell>
      <Table.Cell verticalAlign='top'>
        <div style={track.parentId > 0 ? { marginLeft: 20 } : {}}>
          {track.title}
          {track.extraArtists !== null ? (
            <>
              {track.extraArtists
                .filter((x) => x.categoryName === "remix")
                .map((artist, idx) => {
                  return (
                    <div key={idx} style={{ marginLeft: 20, fontSize: 12 }}>
                      <span
                        style={{
                          color: "red",
                          fontWeight: "bold",
                        }}
                      >
                        {artist.role}{" "}
                        {artist.description !== null
                          ? "[" + artist.description + "]"
                          : null}{" "}
                      </span>
                      &mdash;{" "}
                      <Link to={"/artist/" + artist.artistId}>
                        {artist.anv !== null ? artist.anv : artist.name}
                      </Link>
                      {artist.anv !== null ? "*" : null}
                    </div>
                  );
                })}
              {track.extraArtists
                .filter((x) => x.categoryName === "writing")
                .map((artist, idx) => {
                  return (
                    <div key={idx} style={{ marginLeft: 20, fontSize: 12 }}>
                      <span
                        style={{
                          color: "blue",
                          fontWeight: "bold",
                        }}
                      >
                        {artist.role}{" "}
                        {artist.description !== null
                          ? "[" + artist.description + "]"
                          : null}{" "}
                      </span>
                      &mdash;{" "}
                      <Link to={"/artist/" + artist.artistId}>
                        {artist.anv !== null ? artist.anv : artist.name}
                      </Link>
                      {artist.anv !== null ? "*" : null}
                    </div>
                  );
                })}
              {track.extraArtists
                .filter((x) => x.categoryName === "production")
                .map((artist, idx) => {
                  return (
                    <div key={idx} style={{ marginLeft: 20, fontSize: 12 }}>
                      <span
                        style={{
                          color: "green",
                          fontWeight: "bold",
                        }}
                      >
                        {artist.role}{" "}
                        {artist.description !== null
                          ? "[" + artist.description + "]"
                          : null}{" "}
                      </span>
                      &mdash;{" "}
                      <Link to={"/artist/" + artist.artistId}>
                        {artist.anv !== null ? artist.anv : artist.name}
                      </Link>
                      {artist.anv !== null ? "*" : null}
                    </div>
                  );
                })}
              {track.extraArtists
                .filter((x) => x.categoryName === "performance")
                .map((artist, idx) => {
                  return (
                    <div key={idx} style={{ marginLeft: 20, fontSize: 12 }}>
                      <span
                        style={{
                          color: "orange",
                          fontWeight: "bold",
                        }}
                      >
                        {artist.role}{" "}
                        {artist.description !== null
                          ? "[" + artist.description + "]"
                          : null}{" "}
                      </span>
                      &mdash;{" "}
                      <Link to={"/artist/" + artist.artistId}>
                        {artist.anv !== null ? artist.anv : artist.name}
                      </Link>
                      {artist.anv !== null ? "*" : null}
                    </div>
                  );
                })}
              {track.extraArtists
                .filter((x) => x.categoryName === "other")
                .map((artist, idx) => {
                  return (
                    <div key={idx} style={{ marginLeft: 20, fontSize: 12 }}>
                      <span
                        style={{
                          color: "black",
                          fontWeight: "bold",
                        }}
                      >
                        {artist.role}{" "}
                        {artist.description !== null
                          ? "[" + artist.description + "]"
                          : null}{" "}
                      </span>
                      &mdash;{" "}
                      <Link to={"/artist/" + artist.artistId}>
                        {artist.anv !== null ? artist.anv : artist.name}
                      </Link>
                      {artist.anv !== null ? "*" : null}
                    </div>
                  );
                })}
            </>
          ) : null}
        </div>
      </Table.Cell>
      <Table.Cell verticalAlign='top'>
        {track.type === "track"
          ? new Date(track.duration * 1000).toISOString().substr(14, 5)
          : null}
      </Table.Cell>
    </Table.Row>
  );
};

export default TrackRow;
