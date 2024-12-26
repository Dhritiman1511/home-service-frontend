const UserList = ({ users }) => {
    return (
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">All Users</h2>
        <ul>
          {users.map((user) => (
            <li key={user._id} className="border-b py-2">
              <strong>{user.name}</strong> - {user.email} - {user.phone}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default UserList;  