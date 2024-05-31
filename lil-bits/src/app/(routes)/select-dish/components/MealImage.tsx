import Image from "next/image";

type Image = {
  imageSource: string;
};

const MealImage = ({ imageSource }: Image) => {
  return (
    <Image
      src={imageSource}
      width={500}
      height={500}
      alt="A picture of the current dish"
      priority
    />
  );
};

export default MealImage;
