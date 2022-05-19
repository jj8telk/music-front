import { Link } from "react-router-dom";
import { Table, Icon } from "semantic-ui-react";

import FormatDescription from "../widgets/FormatDescription";
import Genre from "../widgets/Genre";

const ReleaseTableRow = ({ release }) => {
  return (
    <Table.Row>
      <Table.Cell style={{ width: 50 }}>
        {release.images.length > 0 ? (
          <img
            src={release.images[0].uri}
            style={{ maxHeight: 40, maxWidth: 40 }}
            alt='artwork'
          />
        ) : null}
      </Table.Cell>
      <Table.Cell
        style={{
          backgroundColor:
            release.rippedTracks > 0 &&
            release.totalTracks === release.rippedTracks
              ? "rgb(225,255,225)"
              : release.rippedTracks > 0 &&
                release.totalTracks !== release.rippedTracks
              ? "rgb(255,255,225)"
              : null,
        }}
      >
        {release.own ? (
          <Icon color='green' name='checkmark' size='small' />
        ) : (
          <Icon color='red' name='x' size='small' />
        )}
      </Table.Cell>
      <Table.Cell>
        <img
          src={
            process.env.REACT_APP_CORE_API +
            "Release/formatIcon/" +
            release.formatString
          }
          style={{ height: 20 }}
        />
      </Table.Cell>
      <Table.Cell>
        <Link to={"/release/" + release.releaseId}>
          {release.titleFormatted}
        </Link>
      </Table.Cell>
      <Table.Cell>
        {release.formatDescriptions !== null
          ? release.formatDescriptions.map((description) => {
              return (
                <FormatDescription description={description.description} />
              );
            })
          : null}
      </Table.Cell>
      <Table.Cell>
        {release.genres !== null
          ? release.genres.map((genre) => {
              return <Genre genre={genre.name} />;
            })
          : null}
      </Table.Cell>
      <Table.Cell>{release.releaseDateFormatted}</Table.Cell>
    </Table.Row>
  );
};

export default ReleaseTableRow;
