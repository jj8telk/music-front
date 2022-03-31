import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import {
  Segment,
  Grid,
  Button,
  Icon,
  Table,
  Dropdown,
} from "semantic-ui-react";

import { runApi } from "../../services/services";
import releaseService from "../../services/release.service";
import artistService from "../../services/artist.service";

import Paging from "../Data/Paging";
import FormatDescription from "../widgets/FormatDescription";
import Genre from "../widgets/Genre";

const Releases = ({ toggleDiscogs }) => {
  const [tableData, setTableData] = useState(null);
  const [filter, setFilter] = useState({
    page: 1,
    resultsPerPage: 15,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);

  // Filters
  const [artistOptions, setArtistOptions] = useState(null);

  const boolOptions = [
    { key: 0, value: true, text: "Yes" },
    { key: 1, value: false, text: "No" },
  ];

  const releaseTypeOptions = [
    { key: 0, value: "Album", text: "Album" },
    { key: 1, value: "EP", text: "EP" },
    { key: 2, value: "Single", text: "Single" },
    { key: 3, value: "Compilation", text: "Compilation" },
    { key: 4, value: '12"', text: '12"' },
    { key: 5, value: '10"', text: '10"' },
    { key: 6, value: '7"', text: '7"' },
  ];

  const formatOptions = [
    { key: 0, value: "CD", text: "CD" },
    { key: 1, value: "Vinyl", text: "Vinyl" },
    { key: 2, value: "Cassette", text: "Cassette" },
    { key: 3, value: "CDr", text: "CDr" },
    { key: 4, value: "File", text: "File" },
  ];

  const rippedOptions = [
    { key: 0, value: "Ripped", text: "Ripped" },
    { key: 1, value: "Partially", text: "Partially" },
    { key: 2, value: "No", text: "No" },
  ];

  useEffect(() => {
    runApi(artistService.getReleaseArtists, setArtistOptions);
  }, []);

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
                  <Grid.Column width={3}>
                    <h4>Artist</h4>
                    <Dropdown
                      placeholder='Select Artist'
                      fluid
                      search
                      selection
                      clearable
                      options={
                        artistOptions !== null
                          ? artistOptions.map((artist) => {
                              return {
                                key: artist.name,
                                value: artist.name,
                                text: artist.name,
                              };
                            })
                          : null
                      }
                      disabled={artistOptions === null}
                      loading={artistOptions === null}
                      onChange={(event, data) =>
                        setFilter({
                          ...filter,
                          albumArtistName:
                            data.value === "" ? null : data.value,
                        })
                      }
                    ></Dropdown>
                  </Grid.Column>
                  <Grid.Column width={2}>
                    <h4>Release Type</h4>
                    <Dropdown
                      placeholder='Release Type'
                      fluid
                      search
                      selection
                      clearable
                      options={releaseTypeOptions}
                      disabled={releaseTypeOptions === null}
                      loading={releaseTypeOptions === null}
                      onChange={(event, data) =>
                        setFilter({
                          ...filter,
                          releaseType: data.value === "" ? null : data.value,
                        })
                      }
                    ></Dropdown>
                  </Grid.Column>
                  <Grid.Column width={2}>
                    <h4>Format</h4>
                    <Dropdown
                      placeholder='Format'
                      fluid
                      search
                      selection
                      clearable
                      options={formatOptions}
                      disabled={formatOptions === null}
                      loading={formatOptions === null}
                      onChange={(event, data) =>
                        setFilter({
                          ...filter,
                          format: data.value === "" ? null : data.value,
                        })
                      }
                    ></Dropdown>
                  </Grid.Column>
                  <Grid.Column width={1}>
                    <h4>Owned?</h4>
                    <Dropdown
                      placeholder='Owned?'
                      fluid
                      search
                      selection
                      clearable
                      options={boolOptions}
                      disabled={boolOptions === null}
                      loading={boolOptions === null}
                      onChange={(event, data) =>
                        setFilter({
                          ...filter,
                          own: data.value === "" ? null : data.value,
                        })
                      }
                    ></Dropdown>
                  </Grid.Column>
                  <Grid.Column width={1}>
                    <h4>Ripped?</h4>
                    <Dropdown
                      placeholder='Ripped?'
                      fluid
                      search
                      selection
                      clearable
                      options={rippedOptions}
                      disabled={rippedOptions === null}
                      loading={rippedOptions === null}
                      onChange={(event, data) =>
                        setFilter({
                          ...filter,
                          ripped: data.value === "" ? null : data.value,
                        })
                      }
                    ></Dropdown>
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
                    <Table.HeaderCell colSpan='10'>
                      <Paging
                        pageNumbers={pageNumbers}
                        currentPage={currentPage}
                        setPage={setPage}
                        setCurrentPage={setCurrentPage}
                      />
                    </Table.HeaderCell>
                  </Table.Row>
                  <Table.Row>
                    <Table.HeaderCell>
                      <Icon name='music' />
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <Icon name='shopping bag' />
                    </Table.HeaderCell>
                    <Table.HeaderCell>Album Artist</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell>Release</Table.HeaderCell>
                    <Table.HeaderCell>Release Date</Table.HeaderCell>
                    <Table.HeaderCell>Country</Table.HeaderCell>
                    <Table.HeaderCell>Format</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>

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
                            color={
                              release.totalTracks === release.rippedTracks
                                ? "green"
                                : release.rippedTracks > 0
                                ? "yellow"
                                : "grey"
                            }
                          />
                        </Table.Cell>
                        <Table.Cell>
                          <Icon
                            name='circle'
                            color={release.own ? "green" : "red"}
                          />
                        </Table.Cell>
                        <Table.Cell>{release.albumArtist}</Table.Cell>
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
                          {toggleDiscogs ? (
                            <Link to={"/discogsRelease/" + release.discogsId}>
                              {release.title}
                            </Link>
                          ) : (
                            <Link to={"/release/" + release.releaseId}>
                              {release.title}
                            </Link>
                          )}
                        </Table.Cell>
                        <Table.Cell>{release.releaseDateFormatted}</Table.Cell>
                        <Table.Cell>{release.country}</Table.Cell>
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
