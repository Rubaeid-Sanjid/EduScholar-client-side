import { MdDeleteForever } from "react-icons/md";
import SectionTitle from "../../../Component/SectionTitle/SectionTitle";
import useAllAppliedScholarship from "../../../Hooks/useAllAppliedScholarship";
import { useState } from "react";
import AppliedScholarshipDetailsModal from "../../ModalForm/AppliedScholarshipDetailsModal";
import FeedbackModal from "../../ModalForm/FeedbackModal";
const AllAppliedScholarship = () => {
  const [allAppliedScholarship] = useAllAppliedScholarship();

  const [selectedAppliedScholarship, setSelectedAppliedScholarship] =
    useState(null);
  const [selectedFeedbackScholarship, setSelectedFeedbackScholarship] =
    useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApplicationDetails = (appliedScholarship) => {
    setIsModalOpen(true);
    setSelectedAppliedScholarship(appliedScholarship);
  };

  const handleFeedback=(appliedScholarship)=>{
    setIsModalOpen(true);
    setSelectedFeedbackScholarship(appliedScholarship);
  }
  return (
    <div>
      <SectionTitle title={"All Applied Scholarship"}></SectionTitle>
      <div className="overflow-x-auto container mx-auto px-3 lg:px-12">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th className="text-lg">#</th>
              <th className="text-lg">University Name</th>
              <th className="text-lg">Scholarship Name</th>
              <th className="text-lg">Scholarship Category</th>
              <th className="text-lg">Subject Category</th>
              <th className="text-lg">Applied Degree</th>
              <th className="text-lg">Application Fees</th>
              <th className="text-lg">Service Charge</th>
              <th className="text-lg">Application Status</th>
              <th className="text-lg">Action</th>
              <th className="text-lg">Action</th>
              <th className="text-lg">Action</th>
            </tr>
          </thead>
          <tbody>
            {allAppliedScholarship.map((appliedScholarship, index) => (
              <tr key={appliedScholarship._id} className="hover">
                <th>{index + 1}</th>
                <td>{appliedScholarship.universityName}</td>
                <td>{appliedScholarship.scholarshipName}</td>
                <td>{appliedScholarship.category}</td>
                <td>{appliedScholarship.subject}</td>
                <td>{appliedScholarship.degree}</td>
                <td>{appliedScholarship.applicationFees}</td>
                <td>{appliedScholarship.serviceCharge}</td>
                <td>{appliedScholarship.status}</td>
                <td>
                  <button
                    onClick={() => handleApplicationDetails(appliedScholarship)}
                    className="btn btn-md bg-orange-400 text-white"
                  >
                    Details
                  </button>
                </td>
                <td>
                  <button onClick={()=>handleFeedback(appliedScholarship)} className="btn btn-md bg-orange-400 text-white">
                    Feedback
                  </button>
                </td>
                <td>
                  <button className="btn btn-md bg-orange-400 text-white text-2xl">
                    <MdDeleteForever />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedAppliedScholarship && (
        <AppliedScholarshipDetailsModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          selectedAppliedScholarship={selectedAppliedScholarship}
        ></AppliedScholarshipDetailsModal>
      )}

      {selectedFeedbackScholarship && <FeedbackModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        selectedFeedbackScholarship={selectedFeedbackScholarship}
      ></FeedbackModal>}
    </div>
  );
};

export default AllAppliedScholarship;
