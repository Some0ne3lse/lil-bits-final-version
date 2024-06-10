"use client";
import Image, { StaticImageData } from "next/image";
import React, { useCallback } from "react";
import UseEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import styles from "../page.module.css";

type ImageListType = {
  imageList: StaticImageData[];
};

const TheCarousel = ({ imageList }: ImageListType) => {
  // Importing stuff from embla. Loop creates a loop, autoplay makes it play automatically
  const [emblaRef, emblaApi] = UseEmblaCarousel({ loop: true }, [Autoplay()]);

  // To scroll to previous image
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  // To scroll to next image
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
                {/* To control sizes in css, width is 100% and height set to auto.
                This is for making me able to change sizes depending on screen width */}
                <Image
                  className={styles.carousel_images}
                  src={data}
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
