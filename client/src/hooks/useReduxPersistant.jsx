import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setField } from "../redux/persistantDESlice";

function useReduxPersistant() {
  const dispatch = useDispatch();
  //const [data, setData] = useState();

  const updateField = (field, value) => {
    dispatch(setField({ field, value }));
  };

  const getField = (field) => {
    const persistentData = useSelector((store) => store.persistent[field]);
    //setData(persistentData);
    return persistentData;
  };
  const getAllField = () => {
    const persistentData = useSelector((store) => store.persistent);
    //setData(persistentData);
    return persistentData;
  };

  return { updateField, getField, getAllField };
}

export default useReduxPersistant;
