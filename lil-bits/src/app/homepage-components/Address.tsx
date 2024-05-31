import MapComponent from "./MapComponent";
import styles from "../page.module.css";
export default function Address() {
  return (
    <div className={styles.map_container}>
      <div className={styles.map_box}>
        <div className={styles.map_text}>Come by our restaurant!</div>
        <MapComponent />
      </div>
    </div>
  );
}
