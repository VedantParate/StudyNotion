// src/components/common/ReviewSlider.jsx

import { useEffect, useState } from "react"
import { FaStar }              from "react-icons/fa"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, FreeMode }  from "swiper/modules"
import "swiper/css"
import "swiper/css/free-mode"

import { apiConnector }     from "../../services/apiConnector"
import { ratingsEndpoints } from "../../services/apis"

const { REVIEWS_DETAILS_API } = ratingsEndpoints

export default function ReviewSlider() {
  const [reviews,      setReviews]      = useState([])
  const [numWords, setNumWords] = useState(15)

  useEffect(() => {
    async function fetchReviews() {
      const { data } = await apiConnector("GET", REVIEWS_DETAILS_API)
      if (data?.success) setReviews(data?.data)
    }
    fetchReviews()
  }, [])

  return (
    <div className="my-12 text-richblack-5">
      <h2 className="mb-8 text-center text-4xl font-semibold">
        Reviews from other learners
      </h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={24}
        loop={true}
        freeMode={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        modules={[FreeMode, Autoplay]}
        breakpoints={{
          640:  { slidesPerView: 2 },
          768:  { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col gap-3 rounded-lg bg-richblack-800 p-4">

              {/* User info */}
              <div className="flex items-center gap-3">
                <img
                  src={
                    review?.user?.image
                      ? review.user.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                  }
                  alt={review?.user?.firstName}
                  className="h-9 w-9 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-richblack-5">
                    {review?.user?.firstName} {review?.user?.lastName}
                  </p>
                  <p className="text-xs text-richblack-500">
                    {review?.course?.courseName}
                  </p>
                </div>
              </div>

              {/* Review text */}
              <p className="text-sm text-richblack-25">
                {review?.review?.split(" ").length > numWords
                  ? review.review
                      .split(" ")
                      .slice(0, numWords)
                      .join(" ") + "..."
                  : review.review}
              </p>

              {/* Stars + rating */}
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-yellow-100">
                  {review.rating.toFixed(1)}
                </p>
                <div className="flex gap-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < Math.round(review.rating)
                          ? "text-yellow-100"
                          : "text-richblack-400"
                      }
                      size={14}
                    />
                  ))}
                </div>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}