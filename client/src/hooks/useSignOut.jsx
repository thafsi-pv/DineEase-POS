import useReduxPersistant from "./useReduxPersistant";

function useSignOut() {
  const { resetAllPersistantField } = useReduxPersistant();

  const signOut = () => {
    resetAllPersistantField();
  };

  return signOut;
}

export default useSignOut;
