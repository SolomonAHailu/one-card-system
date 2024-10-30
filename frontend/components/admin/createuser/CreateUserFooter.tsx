import { RootState } from "@/store";
import { useSelector } from "react-redux";

const CreateUserFooter = () => {
  const { currentPageUserCreate } = useSelector(
    (state: RootState) => state.user
  );
  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col items-center justify-around w-3/5 gap-y-1">
        <div className="w-full h-[10px] md:h-[15px] bg-white border border-black/50 rounded-lg">
          <div
            className={`${currentPageUserCreate === 1 ? "w-1/2" : "w-full"}     
        } rounded-l-lg bg-[#3AD9B6] h-full`}
          ></div>
        </div>
        <p>{currentPageUserCreate}/2</p>
      </div>
    </div>
  );
};

export default CreateUserFooter;
