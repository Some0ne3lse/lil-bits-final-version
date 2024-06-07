"use client";
import { StaticImageData } from "next/image";
import LinkButton from "../global-components/LinkButton";
import Loading from "../loading";
import styles from "../page.module.css";
import Address from "./Address";
import SearchForEmail from "./SearchForEmail";
import TheCarousel from "./TheCarousel";
import image1 from "../../../public/carousel/first-carousel-image.webp";
import image2 from "../../../public/carousel/second-carousel-image.webp";
import image3 from "../../../public/carousel/third-carousel-image.webp";
import { fromLonLat } from "ol/proj.js";
import Feature from "ol/Feature.js";
import VectorLayer from "ol/layer/Vector.js";
import VectorSource from "ol/source/Vector.js";
import Point from "ol/geom/Point.js";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ReactLoading from "react-loading";

const carouselImages = [image1, image2, image3];

const shuffle = (array: StaticImageData[]) =>
  [...array].sort(() => Math.random() - 0.5);

const EntireHomePage = () => {
  const [imageList, setImageList] = useState(carouselImages);
  const [loading, setLoading] = useState<boolean>(true);
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const [mapLoading, setMapLoading] = useState<boolean>(true);
  const [nextPageLoading, setNextPageLoading] = useState<boolean>(false);

  const lilBitsLonLat = [-118.43986782975233, 34.23507972862415];
  const lilBitsWebMercator = fromLonLat(lilBitsLonLat);

  useEffect(() => {
    const osmLayer = new TileLayer({
      preload: Infinity,
      source: new OSM(),
    });

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [
          new Feature({
            geometry: new Point(lilBitsWebMercator),
          }),
        ],
      }),
    });

    const map = new Map({
      target: "map",
      layers: [osmLayer, vectorLayer],
      view: new View({
        center: lilBitsWebMercator,
        zoom: 12,
      }),
    });
    setMapLoading(false);
    if (!imageLoading && !mapLoading) {
      setLoading(false);
    }
    // @ts-ignore Package doesn't work correctly with typescript, and cannot set null as a type
    return () => map.setTarget(null);
  }, [imageLoading, lilBitsWebMercator, mapLoading]);

  useEffect(() => {
    const mountArray = shuffle(carouselImages);
    setImageList(mountArray);
    setImageLoading(false);
    if (!imageLoading && !mapLoading) {
      setLoading(false);
    }
  }, [imageLoading, mapLoading]);

  if (loading) {
    return <Loading />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className={styles.entire_home_page}
    >
      <TheCarousel imageList={imageList} />
      <div className={styles.order_container}>
        <div className={styles.order_box}>
          <p className={styles.order_text}>Go to our order screen!</p>
          {!nextPageLoading ? (
            <LinkButton
              link="/select-dish"
              text="Order"
              setLoading={() => setNextPageLoading(true)}
            />
          ) : null}
        </div>
      </div>
      <SearchForEmail />
      <Address />
    </motion.div>
  );
};

export default EntireHomePage;
