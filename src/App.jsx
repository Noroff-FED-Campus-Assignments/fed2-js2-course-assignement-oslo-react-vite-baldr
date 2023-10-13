import { Outlet } from "@tanstack/react-router";
import Navbar from "./components/navbar";
import { useState } from "react";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ExampleProfiles from "./components/example-profiles";
import ProfileDetail from "./components/example-profiledetail";
import "./App.css";

function App() {
  const [profiles, setProfiles] = useState([]);
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>
        <Router>
        <Outlet />
          <Switch>
            <Route path="/profiles" exact>
              <ExampleProfiles profiles={profiles} setProfiles={setProfiles} />
            </Route>
            <Route path="/profile/:name">
              <ProfileDetail />
            </Route>
          </Switch>
        </Router>
      </main>

      <footer>
        <small>Created with ❤️ by You</small>
      </footer>
    </>
  );
}

export default App;
