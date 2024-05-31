import MapComponent from "./MapComponent";
import styles from "../page.module.css";
const Address = () => {
  return (
    <div className={styles.map_container}>
      <div className={styles.map_box}>
        <div className={styles.map_text}>Come by our restaurant!</div>
        <MapComponent />
      </div>
    </div>
  );
};

export default Address;
