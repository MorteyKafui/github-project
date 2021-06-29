import RepoItem from "./RepoItem";

export default function Repos({ repos }) {
  return repos.map((repo, id) => {
    return <RepoItem key={id} repos={repo} />;
  });
}
