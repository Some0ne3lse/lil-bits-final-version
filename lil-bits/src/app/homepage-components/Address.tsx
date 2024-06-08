import MapComponent from "./MapComponent";
import styles from "../page.module.css";
const Address = () => {
  // Here we have the component for the map and text.
  // I am not sure if I like having the MapComponent in it's own component.
  // Kept it like this, so you can use the map other places
  // mapID controls what map we are using, defined in main component
  return (
    <div className={styles.map_container}>
      <div className={styles.map_box}>
        <div className={styles.map_text}>Come by our restaurant!</div>
        <MapComponent mapId="map" />
      </div>
    </div>
  );
};

export default Address;
