import { Link } from "react-router-dom";
import useAppliedScholarship from "../../../Hooks/useAppliedScholarship";
import Swal from "sweetalert2";
import { useState } from "react";
import UpdateModalForm from "../../ModalForm/UpdateModalForm";


const MyApplication = () => {
  const [myAppliedScholarship] = useAppliedScholarship();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState(null);

  const handleEdit = (appliedScholarship, status)=>{
    if(status === 'Processing'){
      Swal.fire({
        icon: "error",
        title: "Sorry! Can not Edit. Application is processing",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      });
    }else{
      setSelectedScholarship(appliedScholarship);
      setIsModalOpen(true);
    }
  }
  return (
    <div>
      <h2 className="text-3xl lg:text-4xl font-medium text-center my-8">My Application</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>University Name</th>
              <th>University Address</th>
              <th>Feedback</th>
              <th>Subject Category</th>
              <th>Applied Degree</th>
              <th>Application Fees</th>
              <th>Service Charge</th>
              <th>Application Status</th>
              <th>Action</th>
              <th>Action</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {myAppliedScholarship.map((appliedScholarship, idx) => (
              <tr key={appliedScholarship._id}>
                <th>{idx + 1}</th>
                <td>{appliedScholarship.universityName}</td>
                <td>{appliedScholarship.address}</td>
                <td>{appliedScholarship.feedback}</td>
                <td>{appliedScholarship.subject}</td>
                <td>{appliedScholarship.degree}</td>
                <td>{appliedScholarship.applicationFees}</td>
                <td>{appliedScholarship.serviceCharge}</td>
                <td>{appliedScholarship.status}</td>
                <td>
                  <Link to={`/scholarshipDetails/${appliedScholarship._id}`}>
                    <button className="btn-sm bg-orange-400 text-white btn">
                      Details
                    </button>
                  </Link>
                </td>
                <td>
                  <button onClick={()=>handleEdit(appliedScholarship, appliedScholarship.status)} className="btn-sm bg-orange-400 text-white btn">
                    Edit
                  </button>
                </td>
                <td>
                  <button className="btn-sm bg-orange-400 text-white btn">
                    Cancel Apply
                  </button>
                </td>
                <td>
                  <button className="btn-sm bg-orange-400 text-white btn">
                    Add review
                  </button>
                </td>
                <td>{appliedScholarship._id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedScholarship && (
        <UpdateModalForm
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          selectedScholarship={selectedScholarship}
        />
      )}
    </div>
  );
};

export default MyApplication;
