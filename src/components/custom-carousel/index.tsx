/* eslint-disable @next/next/no-img-element */
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import React from "react";
import CarouselDot, { useDotButton } from "./carousel-dot";

type PropType = {
  options: EmblaOptionsType;
};

const CustomCarousel: React.FC<PropType> = props => {
  const { options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options ?? {});
  
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi || undefined);
  

  const imageSlides = [
    { imageUrl: '/img/register_slide_1.png' },
    { imageUrl: '/img/register_slide_2.png' },
    { imageUrl: '/img/register_slide_3.png' }
  ];

  return (
    <section className="embla relative max-w-full">
      <div className="embla__viewport overflow-hidden" ref={emblaRef}>
        <div className="embla__container ml-auto flex">
          {imageSlides.map((data, index) => (
            <div className="embla__slide" key={index}>
              <div>
                <img
                  alt={`Slide ${index}`}
                  className="relative h-[611px] w-[1000px] object-cover object-left-top"
                  loading="lazy"
                  src={data.imageUrl}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <CarouselDot
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
              key={index}
              onClick={() => onDotButtonClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomCarousel;
