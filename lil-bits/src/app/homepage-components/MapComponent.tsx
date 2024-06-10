"use client";
import "ol/ol.css";
import styles from "../page.module.css";

type MapProps = {
  mapId: string;
};

// This is quite simple. Height and with set to 100% so it can be controlled by css
// ID goes all the way back to main component, which controls what map we are using

const MapComponent = ({ mapId }: MapProps) => {
  return (
    <div className={styles.map_div}>
      <div
        style={{ height: "100%", width: "100%" }}
        id={mapId}
        className={styles.the_map}
      />
    </div>
  );
};

export default MapComponent;
