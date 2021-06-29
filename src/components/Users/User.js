import { useEffect } from "react";
import { Link } from "react-router-dom";

import Spinner from "../Layout/Spinner";
import Repos from "../Repos/Repos";

export default function User({
  getUser,
  match,
  loading,
  getUserRepos,
  repos,
  user: {
    name,
    avatar_url,
    location,
    bio,
    blog,
    login,
    company,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hirable,
  },
}) {
  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
  });

  if (loading) return <Spinner />;

  return (
    <>
      <Link to="/" className="btn btn-light">
        Back To Search
      </Link>
      Hireable:{" "}
      {hirable ? (
        <i className="fas fa-check text-success" />
      ) : (
        <i className="fas fa-times-circle text-danger" />
      )}
      <div className="card grid-2">
        <div className="all-center">
          <img
            src={avatar_url}
            alt=""
            className="round-img"
            style={{ width: "150px" }}
          />
          <h1>{name}</h1>
          <p>Location: {location}</p>
        </div>
        <div>
          {bio && (
            <>
              <h3>Bio</h3>
              <p>{bio}</p>
            </>
          )}
          <a href={html_url} className="btn btn-dark my-1">
            Visit Github Profile
          </a>
          <ul>
            <li>
              {login && (
                <>
                  Username: <strong>{login}</strong>
                </>
              )}
            </li>
            <li>
              {company && (
                <>
                  Company: <strong>{company}</strong>
                </>
              )}
            </li>
            <li>
              {blog && (
                <>
                  Website: <strong>{blog}</strong>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="card text-center">
        <div className="badge badge-primary">Followers: {followers}</div>
        <div className="badge badge-success">Following: {following}</div>
        <div className="badge badge-light">Public Repos: {public_repos}</div>
        <div className="badge badge-dark">Public Gists: {public_gists}</div>
      </div>
      <Repos repos={repos} />
    </>
  );
}
