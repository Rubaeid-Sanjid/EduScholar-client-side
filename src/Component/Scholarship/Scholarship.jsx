import PropTypes from 'prop-types';

const Scholarship = ({scholarshipItem}) => {
  return (
    <div>
      <div className="card bg-base-100 shadow-xl" >
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{scholarshipItem.universityName}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};
Scholarship.propTypes = {
    scholarshipItem: PropTypes.object,
};
export default Scholarship;
