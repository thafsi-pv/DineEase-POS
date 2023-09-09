import Switch from "../switch";

const SwitchField = (props) => {
  const { id, label, desc, mt, mb, color } = props;
  return (
    <div className={`flex justify-between ${mt} ${mb} items-center`}>
      <label
        htmlFor={id}
        className="max-w-[80%] hover:cursor-pointer lg:max-w-[65%]">
        <h5 className="text-base font-bold text-navy-700 dark:text-white">
          {label}
        </h5>
        <p className={`text-sm text-gray-600`}>{desc}</p>
      </label>
      <div>
        <Switch id={id} color={color} />
      </div>
    </div>
  );
};

export default SwitchField;
