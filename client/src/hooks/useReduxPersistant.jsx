import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setField,
  resetAllField,
  resetField,
} from "../redux/persistantDESlice";

function useReduxPersistant() {
  const dispatch = useDispatch();

  const updateField = (field, value) => {
    dispatch(setField({ field, value }));
  };

  const getField = (field) => {
    const persistentData = useSelector((store) => store.persistent[field]);
    return persistentData || null;
  };
  const getAllField = () => {
    const persistentData = useSelector((store) => store.persistent);
    return persistentData;
  };

  const resetAllPersistantField = () => {
    dispatch(resetAllField());
  };

  const resetPersistantField = (field) => {
    dispatch(resetField({ field }));
  };

  return {
    updateField,
    getField,
    getAllField,
    resetAllPersistantField,
    resetPersistantField,
  };
}

export default useReduxPersistant;
