import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Icon } from "semantic-ui-react";

const mapStateToProps = (state) => ({
  currentTrack: state.audio.currentTrack,
  isPlaying: state.audio.isPlaying,
});

function TrackRow(props) {
  return (
    <Table.Row
      style={
        props.track.type === "heading"
          ? {
              backgroundColor: "lightgrey",
              fontWeight: "bold",
            }
          : props.track.type === "index"
          ? { fontWeight: "bold", backgroundColor: "#efefef" }
          : props.track.type === "track" && props.track.parentId > 0
          ? { backgroundColor: "rgb(245,245,245)" }
          : props.currentTrack !== undefined &&
            props.currentTrack !== null &&
            props.currentTrack.releaseTrackId === props.track.releaseTrackId
          ? { background: "rgb(255,230,255)" }
          : props.track.type === "track" && props.track.fileId !== null
          ? { backgroundColor: "rgb(230,255,255)" }
          : {}
      }
    >
      <Table.Cell verticalAlign='top'>
        {props.track.type == "track" ? (
          props.track.fileId !== null ? (
            <>
              {props.currentTrack !== undefined &&
              props.currentTrack !== null &&
              props.currentTrack.releaseTrackId ===
                props.track.releaseTrackId &&
              props.isPlaying ? (
                <Icon
                  name='pause'
                  color='green'
                  style={{ marginRight: 10 }}
                  onClick={() => props.pauseTrack(props.track)}
                />
              ) : (
                <Icon
                  name='play'
                  color='green'
                  style={{ marginRight: 10 }}
                  onClick={() => props.playTrack(props.track)}
                />
              )}

              {!props.track.fileNamed ? (
                <Icon name='exclamation circle' color='yellow' />
              ) : null}
            </>
          ) : (
            <Icon name='x' color='red' />
          )
        ) : null}
      </Table.Cell>
      <Table.Cell verticalAlign='top'>{props.track.position}</Table.Cell>
      <Table.Cell verticalAlign='top'>
        {props.track.artists !== null
          ? props.track.artists.map((artist, idx) => {
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
        <div style={props.track.parentId > 0 ? { marginLeft: 20 } : {}}>
          {props.track.title}
          {props.track.extraArtists !== null ? (
            <>
              {props.track.extraArtists
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
              {props.track.extraArtists
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
              {props.track.extraArtists
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
              {props.track.extraArtists
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
              {props.track.extraArtists
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
        {props.track.type === "track"
          ? new Date(props.track.duration * 1000).toISOString().substr(14, 5)
          : null}
      </Table.Cell>
    </Table.Row>
  );
}

export default connect(mapStateToProps)(TrackRow);
