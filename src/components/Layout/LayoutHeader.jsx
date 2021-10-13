import { Link } from "react-router-dom";
import { Container, Menu } from "semantic-ui-react";

const LayoutHeader = () => {
  return (
    <Menu fixed='top'>
      <Container fluid></Container>
      <Menu.Item header>Music Manager</Menu.Item>
      <Menu.Item>
        <Link to='/releases'>Releases</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to='/artists'>Artists</Link>
      </Menu.Item>
    </Menu>
  );
};

export default LayoutHeader;
