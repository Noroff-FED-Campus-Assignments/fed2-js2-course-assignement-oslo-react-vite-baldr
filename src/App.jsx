import { Outlet } from "@tanstack/react-router";
import Navigation from "./components/navbar";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/Home";
import fetchSpecific from "./pages/Post";
import Post from "./components/example-posts";

function App() {
  return (
    <>
      <header>
        <Navigation />
      </header>

      <main>
        <Router>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/post">
              <Post />
            </Route>
            <Route path="/post/:postId" component={fetchSpecific} />
          </Switch>
          <Outlet />
        </Router>
      </main>

      <footer>
        <small>Created with ❤️ by You</small>
      </footer>
    </>
  );
}

export default App;
