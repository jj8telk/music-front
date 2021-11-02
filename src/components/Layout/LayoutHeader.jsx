import { Link } from "react-router-dom";
import { Container, Menu, Grid, Radio } from "semantic-ui-react";

const LayoutHeader = ({ toggleDiscogs, setToggleDiscogs }) => {
  return (
    <Container fluid>
      <Menu fixed='top'>
        <Menu.Item header>Music Manager</Menu.Item>
        <Menu.Item>
          <Link to='/releases'>Releases</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to='/artists'>Artists</Link>
        </Menu.Item>
        <Menu.Item>
          <Radio
            toggle
            label='Discogs'
            checked={toggleDiscogs}
            onChange={() => {
              setToggleDiscogs(!toggleDiscogs);
            }}
          />
        </Menu.Item>
      </Menu>
    </Container>
  );
};

export default LayoutHeader;
