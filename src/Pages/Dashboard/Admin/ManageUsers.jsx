import { FaRegTrashAlt } from "react-icons/fa";
import SectionTitle from "../../../Component/SectionTitle/SectionTitle";
import useUsers from "../../../Hooks/useUsers";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, refetch] = useUsers();
  const { register, handleSubmit, setValue } = useForm();
  const axiosSecure = useAxiosPrivate();

  const [selectedRoles, setSelectedRoles] = useState({});

  useEffect(() => {
    const initialRoles = users.reduce(
      (acc, user) => ({ ...acc, [user._id]: user.role }),
      {}
    );
    setSelectedRoles(initialRoles);
  }, [users]);

  const onSubmit = async (data, userId) => {
    const updatedRole = data.userRole;
    await axiosSecure.patch(`/users/${userId}`, { role: updatedRole });
    refetch();
  };

  const handleRoleChange = (userId, event) => {
    const newRole = event.target.value;
    setSelectedRoles((prev) => ({ ...prev, [userId]: newRole }));
    setValue("userRole", newRole);
    handleSubmit((data) => onSubmit(data, userId))();
  };

  const handleDeleteUser = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/users/${userId}`);

        if (res.data.deletedCount === 1) {
          Swal.fire({
            title: "Deleted!",
            text: "User has been deleted.",
            icon: "success",
          });
          refetch();
        }
      }
    });
  };
  return (
    <div>
      <SectionTitle title={"Manage Users"}></SectionTitle>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th className="text-lg">#</th>
              <th className="text-lg">User Name</th>
              <th className="text-lg">User Email</th>
              <th className="text-lg">User Role</th>
              <th className="text-lg">Action Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="hover">
                <th>{index + 1}</th>
                <td>{user.user_name}</td>
                <td>{user.user_email}</td>
                <td>
                  <form
                    onSubmit={handleSubmit((data) => onSubmit(data, user._id))}
                  >
                    <select
                      {...register("userRole")}
                      value={selectedRoles[user._id] || user.role}
                      onChange={(e) => handleRoleChange(user._id, e)}
                    >
                      <option value="user">User</option>
                      <option value="moderator">Moderator</option>
                      <option value="admin">Admin</option>
                    </select>
                  </form>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="btn text-xl bg-orange-400 text-white"
                  >
                    <FaRegTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
