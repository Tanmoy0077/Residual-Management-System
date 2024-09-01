import notFound from "./assets/page_not_found.svg";
function ErrorPage() {
  return (
    <div>
      <div className="d-flex justify-content-center">
        <img src={notFound} alt="not found" height={600} width={600} />
      </div>
    </div>
  );
}

export default ErrorPage;
