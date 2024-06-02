import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Banner = () => {
  return (
    <div className="relative">
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
        <SwiperSlide>
          <div
            className="hero min-h-screen"
            style={{
              backgroundImage: "url(https://i.ibb.co/c3YmcJg/banner-2.jpg)",
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="hero min-h-screen"
            style={{
              backgroundImage: "url(https://i.ibb.co/VLdbHWF/banner-3.jpg)",
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="hero min-h-screen"
            style={{
              backgroundImage: "url(https://i.ibb.co/94D7bzP/banner-1.jpg)",
            }}
          >
            <div className="hero-overlay bg-opacity-40"></div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="hero-content text-center text-base-300 absolute top-[12%] md:top-1/3 md:left-36 lg:left-1/3 z-10">
        <div className="max-w-md">
          <h1 className="mb-5 text-3xl lg:text-5xl font-bold">
            Your bright future is our mission
          </h1>
          <p className="mb-5">
            Empowering students with the resources they need to find the perfect
            scholarship and university. Let's make your academic dreams a
            reality.
          </p>
          {/* <button className="btn btn-primary">Get Started</button> */}
        </div>
      </div>
    </div>
  );
};

export default Banner;
