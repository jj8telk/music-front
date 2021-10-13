import { Container } from "semantic-ui-react";
import LayoutHeader from "./LayoutHeader";
import LayoutFooter from "./LayoutFooter";

const Layout = ({ children }) => {
  return (
    <div>
      <LayoutHeader />
      <Container
        fluid
        style={{ marginTop: "5em", padding: "0 25px 25px 25px" }}
      >
        {children}
      </Container>
      <LayoutFooter />
    </div>
  );
};

export default Layout;
