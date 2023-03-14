import "./NotFoundPage.css";
import notFound from "./notFound.gif"

function NotFoundPage() {
  return (
    <div>
      <h1>Page Not Found</h1>
      <p>This page doesn't seem to exist</p>
      <img src={notFound} alt="not found"/>
    </div>
  );
}

export default NotFoundPage;
