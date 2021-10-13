import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Layout from "./components/Layout/Layout";

import Artists from "./components/Artist/Artists";
import Release from "./components/Release/Release";
import Releases from "./components/Release/Releases";

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path='/artists' children={<Artists />}></Route>
          <Route exact path='/release/:id' children={<Release />}></Route>
          <Route exact path='/releases' children={<Releases />}></Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
