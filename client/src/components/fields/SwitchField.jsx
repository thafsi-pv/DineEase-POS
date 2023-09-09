import Switch from "../switch";

const SwitchField = (props) => {
  const { id, label, desc, mt, mb, color } = props;
  return (
    <div className={`flex justify-between ${mt} ${mb} items-center gap-3`}>
      <label
        htmlFor={id}
        className="hover:cursor-pointer ml-3">
        <h5 className="text-sm font-bold text-navy-700 dark:text-white">
          {label}
        </h5>
        <p className={`text-xs text-gray-600`}>{desc}</p>
      </label>
      {/* <label
        htmlFor={id}
        className={`text-sm text-navy-700 dark:text-white ml-3 font-bold`}>
        {label}
      </label> */}
      <div>
        <Switch id={id} color={color} />
      </div>
    </div>
  );
};

export default SwitchField;
