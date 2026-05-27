// frontend/src/components/core/Catalog/CourseSlider.jsx

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import CourseCard from "./CourseCard"

export default function CourseSlider({ courses }) {
  if (!courses || courses.length === 0) {
    return <p className="text-richblack-400">No courses available</p>
  }

  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      spaceBetween={20}
      slidesPerView={1}
      loop={courses.length > 3}   // ← only loop if enough slides
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        640:  { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      className="pb-10"
    >
      {courses.map((course, i) => (
        <SwiperSlide key={i}>
          <CourseCard course={course} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}