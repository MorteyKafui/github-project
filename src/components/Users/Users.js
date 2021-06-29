import UserItems from "./UserItems";
import Spinner from "../Layout/Spinner";

const userStyles = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gridGap: "1rem",
};

export default function Users({ users, loading }) {
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div style={userStyles}>
        {users.map((user, id) => {
          return <UserItems key={id} user={user} />;
        })}
      </div>
    );
  }
}
