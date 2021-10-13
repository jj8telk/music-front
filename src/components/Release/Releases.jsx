import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { Segment, Grid, Button, Icon, Table, Label } from "semantic-ui-react";

import { runApi } from "../../services/services";
import releaseService from "../../services/release.service";

import Paging from "../Data/Paging";
import FormatDescription from "../widgets/FormatDescription";
import Genre from "../widgets/Genre";

const Releases = () => {
  const [tableData, setTableData] = useState(null);
  const [filter, setFilter] = useState({
    page: 1,
    resultsPerPage: 15,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    getReleases();
  }, [currentPage]);

  const getReleases = () => {
    runApi(() => releaseService.getList(filter), buildData);
  };

  const buildData = (response) => {
    setTableData(response);
    setPageNumbers(response.pageNumbers);
  };

  const setPage = (pageNumber) => {
    setFilter({ ...filter, page: pageNumber });
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <h1>Releases</h1>
      <Grid columns={16}>
        <Grid.Row>
          <Grid.Column width={16}>
            <Segment>
              <Grid columns={16}>
                <Grid.Row>
                  <Grid.Column width={2}>
                    <h4>Artist</h4>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={2}>
                    <Button color='blue' size='mini' onClick={getReleases}>
                      <Icon name='search'></Icon>
                      Search
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            {tableData !== null ? (
              <Table compact>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell colSpan='9'>
                      <Paging
                        pageNumbers={pageNumbers}
                        currentPage={currentPage}
                        setPage={setPage}
                        setCurrentPage={setCurrentPage}
                      />
                    </Table.HeaderCell>
                  </Table.Row>
                  <Table.Row>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell>Artist</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell>Release</Table.HeaderCell>
                    <Table.HeaderCell>Format</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell>Country</Table.HeaderCell>
                    <Table.HeaderCell>Release Date</Table.HeaderCell>
                    <Table.HeaderCell>Genre</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {tableData.data.map((release) => {
                    return (
                      <Table.Row>
                        <Table.Cell>
                          <Icon
                            name='circle'
                            color={release.own ? "green" : "red"}
                          />
                        </Table.Cell>
                        <Table.Cell>{release.artistsSort}</Table.Cell>
                        <Table.Cell>
                          <img
                            src={
                              "http://localhost:53866/Release/formatIcon/" +
                              release.formatString
                            }
                            style={{ height: 20 }}
                          />
                        </Table.Cell>
                        <Table.Cell>
                          <Link to={"/release/" + release.releaseId}>
                            {release.title}
                          </Link>
                        </Table.Cell>
                        <Table.Cell>
                          {release.formats !== null
                            ? release.formats.map((format) => {
                                return (
                                  <FormatDescription
                                    description={format.description}
                                  />
                                );
                              })
                            : null}
                        </Table.Cell>
                        <Table.Cell>
                          {release.formatDescriptions !== null
                            ? release.formatDescriptions.map((description) => {
                                return (
                                  <FormatDescription
                                    description={description.description}
                                  />
                                );
                              })
                            : null}
                        </Table.Cell>
                        <Table.Cell>{release.country}</Table.Cell>
                        <Table.Cell>{release.releaseDateFormatted}</Table.Cell>
                        <Table.Cell>
                          {release.genres !== null
                            ? release.genres.map((genre) => {
                                return <Genre genre={genre.name} />;
                              })
                            : null}
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
            ) : null}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default Releases;
