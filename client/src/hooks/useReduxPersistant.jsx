import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function useReduxPersistant() {
  const dispatch = useDispatch();
  //const [data, setData] = useState();

  const updateField = (field, value) => {
    dispatch(setField({ field: field, value: value }));
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
