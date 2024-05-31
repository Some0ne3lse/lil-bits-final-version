import Link from "next/link";

type ReturnToHomepageProps = {
  text: string;
  onClick: () => void;
};

const ReturnToHomepage = ({ text, onClick }: ReturnToHomepageProps) => {
  return (
    <div>
      <Link href="/" onClick={onClick}>
        <button>{text}</button>
      </Link>
    </div>
  );
};

export default ReturnToHomepage;
