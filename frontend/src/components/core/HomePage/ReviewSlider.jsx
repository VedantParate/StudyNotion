// src/components/common/ReviewSlider.jsx
import React, { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

import { apiConnector } from "../../../services/apiConnector";
import { ratingsEndpoints } from "../../../services/apis";

const StarRating = ({ rating }) => (
  <div className="flex gap-[2px] text-yellow-100">
    {[1, 2, 3, 4, 5].map((star) => {
      if (rating >= star) return <FaStar key={star} />;
      if (rating >= star - 0.5) return <FaStarHalfAlt key={star} />;
      return <FaRegStar key={star} />;
    })}
  </div>
);

const TRUNCATE_WORDS = 15;

const PLACEHOLDER_REVIEWS = Array(6).fill(null).map((_, i) => ({
  user: { firstName: "Student", lastName: `${i + 1}`, image: null },
  course: { courseName: "Web Development" },
  review: "Amazing platform. Loved every bit of the learning experience here.",
  rating: 4 + (i % 2) * 0.5,
}));

function ReviewSlider() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        );
        if (data?.success) setReviews(data?.data);
      } catch (err) {
        console.log("Could not fetch reviews:", err);
      }
    })();
  }, []);

  const displayReviews = reviews.length ? reviews : PLACEHOLDER_REVIEWS;

  return (
    <div className="text-white w-full">
      <div className="my-[50px] w-full">
        <Swiper
          slidesPerView={1}
          spaceBetween={16}
          loop={true}
          freeMode={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          modules={[Autoplay, FreeMode]}
          breakpoints={{
            640:  { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {displayReviews.map((review, i) => {
            const firstName = review?.user?.firstName ?? "Student";
            const lastName  = review?.user?.lastName  ?? "";
            const avatarUrl =
              review?.user?.image ||
              `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`;
            const reviewText = review?.review ?? "";
            const truncated =
              reviewText.split(" ").length > TRUNCATE_WORDS
                ? reviewText.split(" ").slice(0, TRUNCATE_WORDS).join(" ") + "..."
                : reviewText;

            return (
              <SwiperSlide key={i}>
                <div className="flex flex-col gap-3 bg-richblack-800 p-4 text-[14px] text-richblack-25 rounded-lg min-h-[180px]">
                  {/* Reviewer info */}
                  <div className="flex items-center gap-3">
                    <img
                      src={avatarUrl}
                      alt={firstName}
                      className="h-9 w-9 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <p className="font-semibold text-richblack-5">
                        {firstName} {lastName}
                      </p>
                      <p className="text-[12px] text-richblack-500">
                        {review?.course?.courseName ?? ""}
                      </p>
                    </div>
                  </div>

                  {/* Review text */}
                  <p className="text-richblack-25">{truncated}</p>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-yellow-100">
                      {Number(review?.rating ?? 0).toFixed(1)}
                    </span>
                    <StarRating rating={review?.rating ?? 0} />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

export default ReviewSlider;