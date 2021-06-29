import { Link } from "react-router-dom";

export default function NavBar({ title, icon }) {
  return (
    <nav className="navbar bg-primary">
      <h1>
        <i className={icon}></i>
        {title}
      </h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
}

NavBar.defaultProps = {
  title: "GitHub Finder",
};
