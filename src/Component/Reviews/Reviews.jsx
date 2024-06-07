// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import PropTypes from 'prop-types'; 

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Reviews = ({scholarshipId}) => {
    const axiosPublic = useAxiosPublic()

    const [reviews, setReviews] = useState([]);

    useEffect(()=>{
        axiosPublic.get(`/reviews/${scholarshipId}`)
        .then(res=>{
            setReviews(res.data);
        })
        .catch(error=>{
            console.log(error);
        })
    },[axiosPublic, scholarshipId])

    console.log(reviews.length);
    return (
        <div>
            <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        
        {
            reviews.map(review => <SwiperSlide key={review._id}>Slide 1</SwiperSlide>)
        }
      </Swiper>
        </div>
    );
};

Reviews.propTypes = {
    scholarshipId: PropTypes.string,
};

export default Reviews;