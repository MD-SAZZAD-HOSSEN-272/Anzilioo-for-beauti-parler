'use client'

import React from 'react'
import Link from 'next/link'

import { Swiper, SwiperSlide } from 'swiper/react'

// Swiper styles
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'

// Swiper modules
import {
  EffectCoverflow,
  Pagination,
  Autoplay,
} from 'swiper/modules'

import { getCategories } from '@/api/category'

export default function HomeCategorySlider() {
  const [category, setCategory] = React.useState<any[]>([])

  React.useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categoryRes = await getCategories()
        setCategory(categoryRes.data || [])
      } catch (error) {
        console.log(error)
      }
    }

    fetchCategory()
  }, [])

  return (
    <div className="w-full">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={false}
        slidesPerView={'auto'}
        spaceBetween={20}
        autoplay={{
          delay: 2500,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 40,
          stretch: 10,
          depth: 50,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[
          EffectCoverflow,
          Pagination,
          Autoplay,
        ]}
        className="w-full py-10"
      >
        {category?.map((c) => (
         <SwiperSlide
  key={c.id}
  className="!w-[250px] md:!w-[280px] lg:!w-[320px]"
>
  <div className="relative overflow-hidden rounded-3xl">
    <Link
      href={`/category/${c.slug}`}
      className="group block"
    >
      <img
        src={c.image}
        alt={c.name}
        className="w-full h-[320px] object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
        <h2 className="text-white text-2xl font-bold text-center px-4">
          {c.name}
        </h2>
      </div>
    </Link>
  </div>
</SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}