import SectionTitle from "../../../Component/SectionTitle/SectionTitle";
import useAuth from "../../../Hooks/useAuth";

const MyProfile = () => {
  const { user } = useAuth();
  return (
    <div className="container px-3 lg:px-12 mx-auto">
      <SectionTitle title={"My Profile"}></SectionTitle>
      <div className="">
        <div className="flex flex-col justify-center items-center gap-6 p-4">
          <div className="avatar">
            <div className="w-32 rounded">
              <img src={user?.photoURL} />
            </div>
          </div>

          <div className="lg:w-1/2">
            <h1 className="text-3xl font-bold flex justify-between gap-4 py-4 border-b">
              <span>Name: </span>
              {user?.displayName}
            </h1>
            <h3 className="text-2xl my-3 flex justify-between items-center gap-4 py-4 border-b">
              <span className="font-medium">Email:</span>
              {user?.email}
            </h3>
            {(user?.role === "moderator" || user?.role === "admin") && (
              <h3 className="text-2xl my-3 flex justify-between items-center gap-4 py-4 border-b">
                <span className="font-medium">Role:</span>
                {user?.role}
              </h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
