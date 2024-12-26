'use client'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";


export default function Slider() {
    return (
        <div className="">
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="w-full h-auto ml-auto mr-auto"
            >
                <SwiperSlide className="text-center text-[18px] bg-white flex justify-center">
                    <img src="https://i.ibb.co/CQSqV3s/IMG-4975.jpg" draggable="false" alt="SwiperSlide" className="block w-screen h-full" />
                </SwiperSlide>
                <SwiperSlide className="text-center text-[18px] bg-white flex justify-center">
                    <img src="https://i.ibb.co/TvK6pKT/IMG-4960.jpg" draggable="false" alt="SwiperSlide" className="block w-screen h-full" />
                </SwiperSlide>
            </Swiper>
        </div>
    );
}