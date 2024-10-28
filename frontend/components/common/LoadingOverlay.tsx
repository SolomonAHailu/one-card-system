import { FaSpinner } from "react-icons/fa";

const LoadingOverlay = () => {
  return (
    <div className="overlay fixed top-0 bottom-0 left-0 right-0 bg-background/50 z-30">
      <div className="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 rounded-lg p-6">
        <FaSpinner className="animate-spin ml-2 text-foreground text-6xl" />
      </div>
    </div>
  );
};

export default LoadingOverlay;
