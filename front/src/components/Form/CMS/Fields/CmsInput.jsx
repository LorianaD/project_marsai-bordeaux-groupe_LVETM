import { inputCmsClasses } from "../../../../utils/formInputClasses.js";

function CmsInput({ name, label, value, onChange, placeholder, type = "text", rightSlot = null, required = false }) {
  return (
    <div className="flex flex-col pb-[10px] w-full justify-start gap-[16px] uppercase placeholder:uppercase">
      <div className="flex justify-between md:flex-row w-full">
        <label htmlFor={name} className="text-[14px] font-semibold tracking-[2.24px] w-full">
          {label}
        </label>
        {rightSlot}
      </div>
      <input
        type={type}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={inputCmsClasses}
      />
    </div>
  );
}

export default CmsInput