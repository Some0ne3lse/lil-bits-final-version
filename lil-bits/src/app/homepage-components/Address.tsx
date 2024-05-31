import MapComponent from "./MapComponent";
import styles from "../page.module.css";
export default function Address() {
  return (
    <div className={styles.map_container}>
      <div className={styles.entire_map}>
        <div>Come by our restaurant!</div>
        <MapComponent />
      </div>
    </div>
  );
}
