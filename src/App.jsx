import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Outlet } from "@tanstack/react-router";
import Navbar from "./components/navbar";
import "./App.css";
import HomePage from "./pages/Home";
import fetchSpecific from "./pages/Post";
import ExampleProfiles from "./components/example-profiles";
import ProfileDetail from "./components/example-profiledetail";
import Post from "./components/example-posts";
import Navigation from "./components/navbar";

function App() {
  return (
    <>
      <header>
        <Navigation />
      </header>

      <main>
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/post" component={Post} />
            <Route path="/post/:postId" component={fetchSpecific} />
            <Route path="/profiles" exact component={ExampleProfiles} />
            <Route path="/profile/:name" component={ProfileDetail} />
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
