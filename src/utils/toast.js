import { Slide, toast } from "react-toastify";

const defaultOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Slide,
};

export function showSuccessToast(message) {
  toast.success(message, defaultOptions);
}

export function showErrorToast(message) {
  toast.error(message, defaultOptions);
}
