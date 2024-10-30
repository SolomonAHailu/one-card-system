import { useDispatch } from "react-redux";
import CreateUserFooter from "./CreateUserFooter";
import { useEffect } from "react";
import { handleFetchPermissions } from "@/store/slices/adminSlice/permission";

const AdditionalInformationForm = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch<any>(handleFetchPermissions());
  }, [dispatch]);
  return (
    <div>
      <CreateUserFooter />
    </div>
  );
};

export default AdditionalInformationForm;
