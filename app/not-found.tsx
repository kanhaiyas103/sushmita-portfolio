import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <span>404 / STORY NOT FOUND</span>
      <h1>THIS PAGE HASN&apos;T BEEN WRITTEN YET.</h1>
      <Link className="primary-link" href="/">
        RETURN HOME →
      </Link>
    </main>
  );
}
