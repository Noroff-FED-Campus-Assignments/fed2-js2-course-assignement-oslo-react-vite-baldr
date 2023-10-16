import { Outlet } from "@tanstack/react-router";
import Navbar from "./components/navbar";
import { useState } from "react";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ExampleProfiles from "./components/example-profiles";
import ProfileDetail from "./components/example-profiledetail";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/Home";
import fetchSpecific from "./pages/Post";
import Post from "./components/example-posts";

function App() {
  return (
    <>
      <header>
        <Navbar />
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
 <Route path="/profiles" exact>
              <ExampleProfiles />
            </Route>
            <Route path="/profile/:name">
              <ProfileDetail />
            </Route>
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
