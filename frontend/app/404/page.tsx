import Link from "next/link";

const Custom404 = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404Custom404 Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link href="/">
        <a>Go back to the homepage</a>
      </Link>
    </div>
  );
};

export default Custom404;
