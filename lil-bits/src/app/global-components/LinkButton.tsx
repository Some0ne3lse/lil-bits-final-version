import Link from "next/link";
import { SetStateAction } from "react";

type LinkProps = {
  link: string;
  text: string;
  setLoading: () => void;
};

const LinkButton = ({ link, text, setLoading }: LinkProps) => {
  return (
    <div>
      <Link href={link}>
        <button
          className="link_button"
          onClick={setLoading}
          style={{ cursor: "pointer" }}
        >
          {text}
        </button>
      </Link>
    </div>
  );
};

export default LinkButton;
