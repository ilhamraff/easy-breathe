import { MoonLoader } from "react-spinners";

function LoadingAnimation() {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-slate-50/50 backdrop-blur-sm fixed inset-0 z-50">
      <MoonLoader color={"#0d9488"} loading={true} size={50} />
    </div>
  );
}

export default LoadingAnimation;
