import Link from "next/link";

type ReturnToHomepageProps = {
  text: string;
  onClick: () => void;
};

export default function ReturnToHomepage({
  text,
  onClick,
}: ReturnToHomepageProps) {
  return (
    <div>
      <Link href="/" onClick={onClick}>
        <button>{text}</button>
      </Link>
    </div>
  );
}
