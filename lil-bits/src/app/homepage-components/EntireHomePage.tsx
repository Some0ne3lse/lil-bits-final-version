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

// Takes the images and puts them in an array
const carouselImages = [image1, image2, image3];

// Shuffle function for carouselImages so images are random
const shuffle = (array: StaticImageData[]) =>
  [...array].sort(() => Math.random() - 0.5);

const EntireHomePage = () => {
  // For setting the images for the carousel
  const [imageList, setImageList] = useState(carouselImages);
  // For loading the page
  const [loading, setLoading] = useState<boolean>(true);
  // To show when image is done loading
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  // To show when map is done loading
  const [mapLoading, setMapLoading] = useState<boolean>(true);
  // Starts the loading circle after selecting navigate to next page
  const [nextPageLoading, setNextPageLoading] = useState<boolean>(false);

  // Takes coordinates and makes them useable for map
  // Used chatGPT to enter correct coordinates here
  const lilBitsLonLat = [-118.43986782975233, 34.23507972862415];
  const lilBitsWebMercator = fromLonLat(lilBitsLonLat);

  // Initial loading for the map
  useEffect(() => {
    // As I understand, this layer is the visual representation of the map.
    // Might be wrong, followed a code pen online
    const osmLayer = new TileLayer({
      preload: Infinity,
      source: new OSM(),
    });

    // This layer is for creating marker that shows location gotten from coordinates
    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [
          new Feature({
            geometry: new Point(lilBitsWebMercator),
          }),
        ],
      }),
    });

    // Here we create the actual map
    const map = new Map({
      target: "map",
      layers: [osmLayer, vectorLayer],
      view: new View({
        center: lilBitsWebMercator,
        zoom: 12,
      }),
    });
    // I decided to not show the entire page before everything had loaded.
    // This is because the map broke the page if used before map finished loading.
    // Once done, it checks if both carousel and map has finished loading
    setMapLoading(false);
    if (!imageLoading && !mapLoading) {
      setLoading(false);
    }
    // @ts-ignore Package doesn't work correctly with typescript, and cannot set null as a type
    return () => map.setTarget(null);
  }, [imageLoading, lilBitsWebMercator, mapLoading]);

  // Here we load the image carousel.
  // Once done, it checks if both carousel and map has finished loading

  useEffect(() => {
    const mountArray = shuffle(carouselImages);
    setImageList(mountArray);
    setImageLoading(false);
    if (!imageLoading && !mapLoading) {
      setLoading(false);
    }
  }, [imageLoading, mapLoading]);

  // If map and image carousel hasn't finished loading, page shows the loading component.
  if (loading) {
    return <Loading />;
  }

  return (
    // motion.div is for the framer motion package, which creates a subtle animation.
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

          {/* On click, this button disappears and shows a loading circle */}

          {!nextPageLoading ? (
            <LinkButton
              link="/select-dish"
              text="Order"
              setLoading={() => setNextPageLoading(true)}
            />
          ) : (
            <ReactLoading
              type="spin"
              height={"2rem"}
              width={"2rem"}
              color="#a86e5f"
            />
          )}
        </div>
      </div>
      <SearchForEmail />
      <Address />
    </motion.div>
  );
};

export default EntireHomePage;
