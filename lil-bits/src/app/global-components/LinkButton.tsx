import Link from "next/link";

type LinkProps = {
  link: string;
  text: string;
};

const LinkButton = ({ link, text }: LinkProps) => {
  return (
    <div>
      <Link href={link}>
        <button className="link_button">{text}</button>
      </Link>
    </div>
  );
};

export default LinkButton;
