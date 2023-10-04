import { Outlet } from "@tanstack/react-router";
import Navigation from "./components/navbar";
import "./App.css";

function App() {
  return (
    <>
      <header>
        <Navigation />
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <small>Created with ❤️ by You</small>
      </footer>
    </>
  );
}

export default App;
