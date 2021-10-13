import { useState } from "react";

import { Segment, Grid, Button, Icon } from "semantic-ui-react";

const Artists = () => {
  const getArtists = () => {};

  return (
    <>
      <h1>Artists</h1>
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
                    <Button color='blue' size='mini' onClick={getArtists}>
                      <Icon name='search'></Icon>
                      Search
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default Artists;
