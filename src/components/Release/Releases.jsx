import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import {
  Segment,
  Grid,
  Button,
  Icon,
  Table,
  Dropdown,
  Label,
  LabelDetail,
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
  const [labelOptions, setLabelOptions] = useState(null);

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

  const folderOptions = [
    { key: 0, value: "4500023", text: "Main" },
    { key: 1, value: "4499918", text: "Classical" },
    { key: 2, value: "4361528", text: "Others" },
    { key: 3, value: "4551116", text: "Comedy" },
  ];

  useEffect(() => {
    runApi(artistService.getReleaseArtists, (data) => {
      setArtistOptions(data);
    });
    runApi(releaseService.getLabels, (data) => {
      setLabelOptions(
        data.map((d) => {
          return { key: d.entityId, value: d.entityId, text: d.name };
        })
      );
    });
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

  function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === obj) {
        return true;
      }
    }

    return false;
  }

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
                      options={artistOptions}
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
                  <Grid.Column width={2}>
                    <h4>Label</h4>
                    <Dropdown
                      placeholder='Label'
                      fluid
                      search
                      selection
                      clearable
                      options={labelOptions}
                      disabled={labelOptions === null}
                      loading={labelOptions === null}
                      onChange={(event, data) =>
                        setFilter({
                          ...filter,
                          labelId: data.value === "" ? null : data.value,
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
                  <Grid.Column width={1}>
                    <h4>Folder</h4>
                    <Dropdown
                      placeholder='Folder'
                      fluid
                      search
                      selection
                      clearable
                      options={folderOptions}
                      disabled={folderOptions === null}
                      loading={folderOptions === null}
                      onChange={(event, data) =>
                        setFilter({
                          ...filter,
                          discogsFolderId:
                            data.value === "" ? null : data.value,
                        })
                      }
                    ></Dropdown>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={2}>
                    <Button
                      color='blue'
                      size='mini'
                      onClick={() => {
                        setCurrentPage(1);
                        let f = { ...filter };
                        f.page = 1;
                        setFilter(f);
                        getReleases();
                      }}
                    >
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
                    <Table.HeaderCell colSpan='11'>
                      <Paging
                        pageNumbers={pageNumbers}
                        currentPage={currentPage}
                        setPage={setPage}
                        setCurrentPage={setCurrentPage}
                      />
                    </Table.HeaderCell>
                  </Table.Row>
                  {/* <Table.Row>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                  </Table.Row> */}
                </Table.Header>
                <Table.Body>
                  {tableData.data.map((release) => {
                    return (
                      <Table.Row
                        key={release.id}
                        style={{
                          backgroundColor: !release.own
                            ? "rgb(240,240,240)"
                            : release.totalTracks === release.rippedTracks
                            ? ""
                            : "",
                        }}
                      >
                        <Table.Cell
                          style={{
                            borderLeft:
                              release.releaseType === "Album"
                                ? "10px solid #2185d0"
                                : release.releaseType === "EP"
                                ? "10px solid #00b5ad"
                                : release.releaseType === "Single"
                                ? "10px solid #21ba45"
                                : release.releaseType === "Compilation"
                                ? "10px solid #fbbd08"
                                : "10px solid #cccccc",
                          }}
                        >
                          {/* {release.own ? (
                            <Icon
                              name='circle'
                              size='small'
                              color={
                                release.totalTracks === release.rippedTracks
                                  ? "green"
                                  : release.rippedTracks > 0
                                  ? "yellow"
                                  : "red"
                              }
                            />
                          ) : null} */}
                        </Table.Cell>
                        <Table.Cell>
                          {release.own ? (
                            <Icon
                              name='play'
                              size='large'
                              style={{
                                color:
                                  release.totalTracks === release.rippedTracks
                                    ? "#21ba45"
                                    : release.rippedTracks === 0
                                    ? "#dddddd"
                                    : "orange",
                              }}
                            />
                          ) : null}
                        </Table.Cell>
                        <Table.Cell>
                          <img
                            src={
                              process.env.REACT_APP_CORE_API +
                              "Release/formatIcon/" +
                              release.formatString
                            }
                            style={{ height: 40, marginRight: 7 }}
                          />
                        </Table.Cell>

                        <Table.Cell>
                          {release.images !== null ? (
                            release.images.length > 0 ? (
                              <img
                                src={release.images[0].uri}
                                style={{ height: 50 }}
                                alt='artwork'
                              />
                            ) : null
                          ) : null}
                        </Table.Cell>
                        <Table.Cell>
                          <Link to={"/artist/" + release.albumArtist}>
                            <span style={{ fontSize: 16, fontWeight: "bold" }}>
                              {release.albumArtist}
                            </span>
                          </Link>
                          <br />
                          <span style={{ fontSize: 15 }}>
                            {toggleDiscogs ? (
                              <Link to={"/discogsRelease/" + release.discogsId}>
                                {release.title}
                              </Link>
                            ) : (
                              <Link to={"/release/" + release.releaseId}>
                                {release.title}
                              </Link>
                            )}
                          </span>
                        </Table.Cell>

                        {/* <Table.Cell>
                          {release.formats !== null
                            ? release.formats.map((format) => {
                                return (
                                  <FormatDescription
                                    description={format.description}
                                  />
                                );
                              })
                            : null}
                        </Table.Cell> */}
                        <Table.Cell>
                          <span style={{ fontSize: 16, marginRight: 10 }}>
                            {release.releaseDateFormatted}
                          </span>
                          &nbsp;
                          {release.country}
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
                          {release.labels !== null
                            ? release.labels.map((label) => {
                                return (
                                  <Label
                                    basic
                                    size={
                                      release.labels.length > 1
                                        ? "medium"
                                        : "large"
                                    }
                                    style={{ borderRadius: 0 }}
                                  >
                                    {label.entity}
                                    <LabelDetail>{label.catNo}</LabelDetail>
                                  </Label>
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
            ) : // <Table compact>
            //   <Table.Header>
            //     <Table.Row>
            //       <Table.HeaderCell colSpan='11'>
            //         <Paging
            //           pageNumbers={pageNumbers}
            //           currentPage={currentPage}
            //           setPage={setPage}
            //           setCurrentPage={setCurrentPage}
            //         />
            //       </Table.HeaderCell>
            //     </Table.Row>
            //     <Table.Row>
            //       <Table.HeaderCell>
            //         <Icon name='music' />
            //       </Table.HeaderCell>
            //       <Table.HeaderCell>
            //         <Icon name='shopping bag' />
            //       </Table.HeaderCell>
            //       <Table.HeaderCell>Album Artist</Table.HeaderCell>
            //       <Table.HeaderCell></Table.HeaderCell>
            //       <Table.HeaderCell>Release</Table.HeaderCell>
            //       <Table.HeaderCell>Release Date</Table.HeaderCell>
            //       <Table.HeaderCell>Country</Table.HeaderCell>
            //       <Table.HeaderCell>Format</Table.HeaderCell>
            //       <Table.HeaderCell></Table.HeaderCell>
            //       <Table.HeaderCell>Label</Table.HeaderCell>
            //       <Table.HeaderCell>Genre</Table.HeaderCell>
            //     </Table.Row>
            //   </Table.Header>
            //   <Table.Body>
            //     {tableData.data.map((release) => {
            //       return (
            //         <Table.Row key={release.id}>
            //           <Table.Cell>
            //             <Icon
            //               name='circle'
            //               color={
            //                 release.totalTracks === release.rippedTracks
            //                   ? "green"
            //                   : release.rippedTracks > 0
            //                   ? "yellow"
            //                   : "grey"
            //               }
            //             />
            //           </Table.Cell>
            //           <Table.Cell>
            //             <Icon
            //               name='circle'
            //               color={release.own ? "green" : "red"}
            //             />
            //           </Table.Cell>
            //           <Table.Cell>
            //             <Link to={"/artist/" + release.albumArtist}>
            //               {release.albumArtist}
            //             </Link>
            //           </Table.Cell>
            //           <Table.Cell>
            //             <img
            //               src={
            //                 process.env.REACT_APP_CORE_API +
            //                 "Release/formatIcon/" +
            //                 release.formatString
            //               }
            //               style={{ height: 20 }}
            //             />
            //           </Table.Cell>
            //           <Table.Cell>
            //             {toggleDiscogs ? (
            //               <Link to={"/discogsRelease/" + release.discogsId}>
            //                 {release.title}
            //               </Link>
            //             ) : (
            //               <Link to={"/release/" + release.releaseId}>
            //                 {release.title}
            //               </Link>
            //             )}
            //           </Table.Cell>
            //           <Table.Cell>{release.releaseDateFormatted}</Table.Cell>
            //           <Table.Cell>{release.country}</Table.Cell>
            //           <Table.Cell>
            //             {release.formats !== null
            //               ? release.formats.map((format) => {
            //                   return (
            //                     <FormatDescription
            //                       description={format.description}
            //                     />
            //                   );
            //                 })
            //               : null}
            //           </Table.Cell>
            //           <Table.Cell>
            //             {release.formatDescriptions !== null
            //               ? release.formatDescriptions.map((description) => {
            //                   return (
            //                     <FormatDescription
            //                       description={description.description}
            //                     />
            //                   );
            //                 })
            //               : null}
            //           </Table.Cell>
            //           <Table.Cell>
            //             {release.labels !== null
            //               ? release.labels.map((label) => {
            //                   return (
            //                     <Label basic>
            //                       {label.entity}
            //                       <LabelDetail color='blue'>
            //                         {label.catNo}
            //                       </LabelDetail>
            //                     </Label>
            //                   );
            //                 })
            //               : null}
            //           </Table.Cell>
            //           <Table.Cell>
            //             {release.genres !== null
            //               ? release.genres.map((genre) => {
            //                   return <Genre genre={genre.name} />;
            //                 })
            //               : null}
            //           </Table.Cell>
            //         </Table.Row>
            //       );
            //     })}
            //   </Table.Body>
            // </Table>
            null}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default Releases;
