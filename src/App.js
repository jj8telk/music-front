import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Layout from "./components/Layout/Layout";

import Artists from "./components/Artist/Artists";
import Artist from "./components/Artist/Artist";
import Release from "./components/Release/Release";
import DiscogsRelease from "./components/Release/DiscogsRelease";
import Releases from "./components/Release/Releases";

function App() {
  require("dotenv").config();

  const [toggleDiscogs, setToggleDiscogs] = useState(false);

  return (
    <Router>
      <Layout toggleDiscogs={toggleDiscogs} setToggleDiscogs={setToggleDiscogs}>
        <Switch>
          <Route
            exact
            path='/artists'
            children={<Artists toggleDiscogs={toggleDiscogs} />}
          ></Route>
          <Route
            exact
            path='/artist/:name'
            children={<Artist toggleDiscogs={toggleDiscogs} />}
          ></Route>
          <Route
            exact
            path='/release/:id'
            children={<Release toggleDiscogs={toggleDiscogs} />}
          ></Route>
          <Route
            exact
            path='/discogsRelease/:id'
            children={<DiscogsRelease toggleDiscogs={toggleDiscogs} />}
          ></Route>
          <Route
            exact
            path='/releases'
            children={<Releases toggleDiscogs={toggleDiscogs} />}
          ></Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
