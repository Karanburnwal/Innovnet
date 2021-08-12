import "./App.css";
import TopBar from "./Component/TopBar/TopBar";
import Home from "../src/Page/Home/Home";
import Write from "./Page/Write/Write";
import Settings from "./Page/Settings/Settings";
import Login from "./Page/Login/Login";
import Register from "./Page/Register/Register";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import SingleP from "./Page/Single/Single";
import { UseSessionContext } from "./Context/Context";
function App() {
  const { user } = UseSessionContext();
  return (
    <>
      <Router>
        <TopBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={user ? Home : Register} />
          <Route path="/login" component={user ? Home : Login} />
          <Route path="/write" component={user ? Write : Register} />
          <Route path="/settings" component={user ? Settings : Register} />
          <Route path="/posts/:postId" component={SingleP} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
