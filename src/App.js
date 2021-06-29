import { useState, useEffect } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from "./components/Layout/NavBar";
import Users from "./components/Users/Users";
import User from "./components/Users/User";
import Search from "./components/Users/Search";
import Alert from "./components/Layout/Alert";
import About from "./components/Pages/About";

import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [alert, setAlert] = useState(null);

  const [user, setUser] = useState({});

  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("https://api.github.com/users");

      const data = await res.json();

      setUsers(data);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const searchUsers = async (text) => {
    setLoading(true);
    const res = await fetch(`https://api.github.com/search/users?q=${text}`);

    const data = await res.json();

    setUsers(data.items);
  };

  const getUser = async (username) => {
    const res = await fetch(`https://api.github.com/users/${username}`);

    const data = await res.json();
    setUser(data);
    setLoading(false);
  };

  const getUserRepos = async (username) => {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id`
    );

    const data = await res.json();
    setRepos(data);
    setLoading(false);
  };

  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  const setAlertMsg = (msg, type) => {
    setAlert({ alert: { msg, type } });

    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  return (
    <Router>
      <div className="App">
        <NavBar title="GitHub Finder" icon="fas fa-github" />
        <div className="container">
          <Alert alert={alert} />

          <Switch>
            <Route
              path="/"
              exact
              render={(props) => (
                <>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={setAlertMsg}
                  />
                  <Users users={users} loading={loading} />
                </>
              )}
            />
            <Route exact path="/about" component={About} />
            <exact
              path="/user/:login"
              render={(props) => (
                <User
                  {...props}
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  repos={repos}
                  user={user}
                  loading={loading}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
