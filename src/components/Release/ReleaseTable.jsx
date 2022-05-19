import { Table } from "semantic-ui-react";

import ReleaseTableRow from "./ReleaseTableRow";

const ReleaseTable = ({ releases }) => {
  return (
    <Table celled padded>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell singleLine>&nbsp;</Table.HeaderCell>
          <Table.HeaderCell style={{ width: 10 }}>&nbsp;</Table.HeaderCell>
          <Table.HeaderCell style={{ width: 10 }}>&nbsp;</Table.HeaderCell>
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.HeaderCell>Format</Table.HeaderCell>
          <Table.HeaderCell>Genre</Table.HeaderCell>
          <Table.HeaderCell>Date</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {releases
          .sort((a, b) => (a.title < b.title ? 1 : -1))
          .sort((a, b) => (a.releaseDate > b.releaseDate ? 1 : -1))
          .map((release) => {
            return <ReleaseTableRow release={release} />;
          })}
      </Table.Body>
    </Table>
  );
};

export default ReleaseTable;
