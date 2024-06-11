import useAppliedScholarship from "../../../Hooks/useAppliedScholarship";

const MyApplication = () => {
  const [myAppliedScholarship] = useAppliedScholarship()

  return (
    <div>
      <h2>My Application </h2>
      <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
      </tr>
    </thead>
    <tbody>
      {myAppliedScholarship.map((appliedScholarship, idx) => <tr key={appliedScholarship._id}>
        <th>{idx + 1}</th>
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
        <td>Blue</td>
      </tr>)}
      
      
    </tbody>
  </table>
</div>
    </div>
  );
};

export default MyApplication;
