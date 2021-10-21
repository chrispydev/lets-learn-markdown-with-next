import Link from "next/link";

export default function Header() {
  return (
    <header>
      <Link href='/' passHref>
        <h2>Dev Blog</h2>
      </Link>
    </header>
  );
}
