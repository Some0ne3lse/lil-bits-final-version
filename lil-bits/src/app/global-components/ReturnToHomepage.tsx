import Link from "next/link";

type ReturnToHomepageProps = {
  text: string;
  onClick: () => void;
};

// This button is to return to homepage.
// onClick function is there to reset the different setStates in the project

const ReturnToHomepage = ({ text, onClick }: ReturnToHomepageProps) => {
  return (
    <div className="return_to_home_container">
      <Link href="/" onClick={onClick}>
        <button className="return_to_home_button" style={{ cursor: "pointer" }}>
          {text}
        </button>
      </Link>
    </div>
  );
};

export default ReturnToHomepage;
