"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper";

type ProductImageSliderProps = {
  images: { id: string; url: string; type: string }[];
  title: string;
};

const ProductImageSlider = ({ images, title }: ProductImageSliderProps) => {
  const [activeIndex, setActiveIndex] = useState(0); // Track active thumbnail
  const [mainSwiper, setMainSwiper] = useState<SwiperClass | null>(null); // Update state to hold Swiper instance

  return (
    <div className="space-y-6">
      {/* Main Slider */}
      <Swiper
        onSwiper={(swiper) => setMainSwiper(swiper)} // Capture the Swiper instance
        style={
          {
            "--swiper-navigation-color": "#216862",
          } as React.CSSProperties
        }
        loop={true}
        spaceBetween={10}
        navigation={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)} // Update active index
        modules={[FreeMode, Navigation, Thumbs]}
        className="rounded-lg shadow-md "
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <div className="flex justify-center items-center h-[400px]">
              <Image
                src={image.url}
                alt={title}
                width={500}
                height={500}
                className="object-contain max-h-full rounded-lg pb-4"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Slider */}
      <Swiper
        loop={false}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs]}
        className="rounded-lg shadow-md "
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={image.id}
            onClick={() => {
              setActiveIndex(index); // Update active index
              mainSwiper?.slideToLoop(index); // Navigate main slider to corresponding slide
            }}
          >
            <div
              className={`flex justify-center items-center h-[100px] mb-4 cursor-pointer transition-opacity duration-300 ${
                activeIndex === index ? "opacity-100" : "opacity-50"
              }`}
            >
              <Image
                src={image.url}
                alt={title}
                width={100}
                height={100}
                className="object-cover rounded-lg"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductImageSlider;
