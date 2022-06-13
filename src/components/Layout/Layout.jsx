import { Container } from "semantic-ui-react";
import LayoutHeader from "./LayoutHeader";
import LayoutFooter from "./LayoutFooter";

const Layout = ({ children, toggleDiscogs, setToggleDiscogs }) => {
  return (
    <div>
      <LayoutHeader
        toggleDiscogs={toggleDiscogs}
        setToggleDiscogs={setToggleDiscogs}
      />
      <Container fluid style={{ marginTop: "5em", padding: "0" }}>
        {children}
      </Container>
      <LayoutFooter />
    </div>
  );
};

export default Layout;
