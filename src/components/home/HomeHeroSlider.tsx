'use client'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Import required modules
import {
  EffectFade,
  Navigation,
  Pagination,
  Autoplay,
} from 'swiper/modules'

export default function App() {
  return (
    <div className="w-full">
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        navigation={true}
        autoplay={{
          delay: 2500,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[
          EffectFade,
          Navigation,
          Pagination,
          Autoplay,
        ]}
        className="rounded-2xl overflow-hidden"
      >
        <SwiperSlide>
          <img
            className="
              w-full 
              h-[180px]
              sm:h-[250px]
              md:h-[350px]
              lg:h-[450px]
              object-cover
            "
            src="https://shop.shajgoj.com/_next/image?url=https%3A%2F%2Fbk.shajgoj.com%2Fstorage%2F2026%2F05%2Funilever-brand-bargain-eid-edition-web.jpg&w=1920&q=75"
            alt="banner"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            className="
              w-full 
              h-[180px]
              sm:h-[250px]
              md:h-[350px]
              lg:h-[450px]
              object-cover
            "
            src="https://shop.shajgoj.com/_next/image?url=https%3A%2F%2Fbk.shajgoj.com%2Fstorage%2F2026%2F02%2Fshajgoj-treasure-of-glow-web-slider.png&w=1920&q=75"
            alt="banner"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            className="
              w-full 
              h-[180px]
              sm:h-[250px]
              md:h-[350px]
              lg:h-[450px]
              object-cover
            "
            src="https://shop.shajgoj.com/_next/image?url=https%3A%2F%2Fbk.shajgoj.com%2Fstorage%2F2024%2F10%2Fshop-by-concern-web-updated.png&w=1920&q=75"
            alt="banner"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}