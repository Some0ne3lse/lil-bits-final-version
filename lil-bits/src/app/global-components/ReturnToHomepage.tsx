import Link from "next/link";

type ReturnToHomepageProps = {
  text: string;
  onClick: () => void;
};

const ReturnToHomepage = ({ text, onClick }: ReturnToHomepageProps) => {
  return (
    <div className="return_to_home_container">
      <Link href="/" onClick={onClick}>
        <button className="return_to_home_button">{text}</button>
      </Link>
    </div>
  );
};

export default ReturnToHomepage;
