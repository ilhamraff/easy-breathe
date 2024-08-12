import { MoonLoader } from "react-spinners";

function LoadingAnimation() {
  return (
    <div className="spinner-container">
      <MoonLoader color={"#008080"} loading={true} size={50} />;
    </div>
  );
}

export default LoadingAnimation;
