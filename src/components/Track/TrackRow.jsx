import { Link } from "react-router-dom";
import { Table, Icon } from "semantic-ui-react";

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
          : {}
      }
    >
      <Table.Cell verticalAlign='top'>{track.position}</Table.Cell>
      <Table.Cell verticalAlign='top'>
        {track.artists !== null
          ? track.artists.map((artist, idx) => {
              return (
                <span key={idx}>
                  <Link to={"/artist/" + artist.artistId}>
                    {artist.anv !== null ? artist.anv : artist.name}
                  </Link>
                  {artist.anv !== null ? "*" : null}
                </span>
              );
            })
          : null}
      </Table.Cell>
      <Table.Cell verticalAlign='top'>
        {track.title}
        {track.extraArtists !== null
          ? track.extraArtists.map((artist, idx) => {
              return (
                <div key={idx} style={{ marginLeft: 20, fontSize: 12 }}>
                  {artist.role} &mdash;{" "}
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
        {track.type === "track"
          ? new Date(track.duration * 1000).toISOString().substr(14, 5)
          : null}
      </Table.Cell>
      <Table.Cell verticalAlign='top'>
        {track.fileId !== null ? (
          <>
            <Icon name='check' color='green' style={{ marginRight: 10 }} />
            {!track.fileNamed ? (
              <Icon name='exclamation circle' color='yellow' />
            ) : null}
          </>
        ) : (
          <Icon name='x' color='red' />
        )}
      </Table.Cell>
    </Table.Row>
  );
};

export default TrackRow;
