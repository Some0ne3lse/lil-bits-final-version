import Link from "next/link";

type LinkProps = {
  link: string;
  text: string;
  setLoading: () => void;
};

const LinkButton = ({ link, text, setLoading }: LinkProps) => {
  // This is the button to navigate to next page.
  // The setLoading code is to start the loading spinner, so user wont click again and again
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
