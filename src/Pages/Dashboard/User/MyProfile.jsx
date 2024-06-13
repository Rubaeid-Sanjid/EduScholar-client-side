import useAuth from "../../../Hooks/useAuth";

const MyProfile = () => {
  const { user } = useAuth();
  return (
    <div className="container px-3 lg:px-12 mx-auto">
      <h2 className="text-3xl lg:text-4xl font-medium text-center my-8">My Profile</h2>
      <div className="">
        <div className="flex gap-6 p-4">
          <div className="avatar">
            <div className="w-32 rounded">
              <img src={user?.photoURL} />
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold">{user?.displayName}</h1>
            <h3 className="my-3">{user?.email}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
