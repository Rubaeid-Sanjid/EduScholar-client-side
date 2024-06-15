import Review from "../../../Component/Review/Review";
import SectionTitle from "../../../Component/SectionTitle/SectionTitle";
import useReviews from "../../../Hooks/useReviews";

const AllReviews = () => {
    const [reviews] = useReviews();
    return (
        <div>
            <SectionTitle title={"All Reviews"}></SectionTitle>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 container mx-auto px-2 lg:px-8">
                {
                    reviews.map(review => <Review key={review._id} review={review}></Review>)
                }
            </div>
        </div>
    );
};

export default AllReviews;