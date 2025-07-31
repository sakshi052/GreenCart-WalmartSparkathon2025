import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function HeroCarousel() {
  const slides = ['/images/banner1.jpg','/images/banner2.jpg'];
  return (
    <div className="mt-32">
      <Swiper loop autoplay>
        {slides.map((src,i) => (
          <SwiperSlide key={i}>
            <img src={src} className="w-full h-80 object-cover"/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
