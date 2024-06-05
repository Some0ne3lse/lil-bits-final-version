import Image from "next/image";
import styles from "../dish.module.css";

type ImageType = {
  imageSource: string;
};

const MealImage = ({ imageSource }: ImageType) => {
  return (
    <div className={styles.image_box}>
      <Image
        src={imageSource}
        alt="A picture of the current dish"
        fill
        sizes="100%"
        className={styles.dish_image}
        priority
      />
    </div>
  );
};

export default MealImage;
