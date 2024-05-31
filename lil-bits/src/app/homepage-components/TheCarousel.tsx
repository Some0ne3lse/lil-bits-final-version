"use client";
import Image, { StaticImageData } from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import UseEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import image1 from "../../../public/carousel/first-carousel-image.webp";
import image2 from "../../../public/carousel/second-carousel-image.webp";
import image3 from "../../../public/carousel/third-carousel-image.webp";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import styles from "../page.module.css";

const carouselImages = [image1, image2, image3];

const shuffle = (array: StaticImageData[]) =>
  [...array].sort(() => Math.random() - 0.5);

const TheCarousel = () => {
  const [emblaRef, emblaApi] = UseEmblaCarousel({ loop: true }, [Autoplay()]);

  const [imageList, setImageList] = useState(carouselImages);
  useEffect(() => {
    const mountArray = shuffle(carouselImages);
    setImageList(mountArray);
  }, []);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className={styles.carousel_container}>
      <div className={styles.embla}>
        <button
          aria-label="go to previous slide"
          onClick={scrollPrev}
          className={styles.carousel_button_left}
        >
          <ChevronLeftIcon className={styles.chevron_buttons} />
        </button>
        <button
          aria-label="go to previous slide"
          onClick={scrollNext}
          className={styles.carousel_button_right}
        >
          <ChevronRightIcon className={styles.chevron_buttons} />
        </button>
        <div className={styles.embla__viewport} ref={emblaRef}>
          <div className={styles.embla__container}>
            {imageList.map((data, index) => (
              <div className={styles.embla__slide} key={index}>
                <Image
                  className={styles.carousel_images}
                  src={data}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto", borderRadius: 8 }}
                  alt="Image of one of our dishes"
                  priority
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheCarousel;
