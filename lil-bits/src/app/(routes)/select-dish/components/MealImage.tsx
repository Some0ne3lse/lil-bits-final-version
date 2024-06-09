import Image from "next/image";
import styles from "../dish.module.css";
import { motion } from "framer-motion";

type ImageType = {
  imageSource: string;
};

// This is just the component to show the meal image
// For any future developers, remember to edit next.config.mjs to allow images from other sites
const MealImage = ({ imageSource }: ImageType) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className={styles.image_box}
    >
      <Image
        src={imageSource}
        alt="A picture of the current dish"
        fill
        sizes="100%"
        className={styles.dish_image}
        priority
      />
    </motion.div>
  );
};

export default MealImage;
