"use client";
import { useEffect } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "ol/ol.css";
import { fromLonLat } from "ol/proj.js";
import Feature from "ol/Feature.js";
import VectorLayer from "ol/layer/Vector.js";
import VectorSource from "ol/source/Vector.js";
import Point from "ol/geom/Point.js";
import styles from "../page.module.css";

const MapComponent = () => {
  // Used chatGPT to enter correct coordinates here

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
    // @ts-ignore Package doesn't work correctly with typescript, and cannot set null as a type
    return () => map.setTarget(null);
  }, [lilBitsWebMercator]);

  return (
    <div
      style={{ height: "300px", width: "80%" }}
      id="map"
      className={styles.the_map}
    />
  );
};

export default MapComponent;
