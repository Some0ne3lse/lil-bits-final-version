"use client";

import "ol/ol.css";
import styles from "../page.module.css";

const MapComponent = () => {
  // Used chatGPT to enter correct coordinates here

  return (
    <div className={styles.map_div}>
      <div
        style={{ height: "100%", width: "100%" }}
        id="map"
        className={styles.the_map}
      />
    </div>
  );
};

export default MapComponent;
