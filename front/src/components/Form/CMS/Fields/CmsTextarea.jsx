function CmsTextarea({ name, label, type = "text", value, onChange, placeholder, rows = 4, rightSlot = null, required = false }) {
  return (
    <div className="flex flex-col pb-[10px] w-full justify-start gap-[16px] self-stretch uppercase placeholder:uppercase">
      <div className="flex justify-between flex-col md:flex-row">
        <label htmlFor={name} className="text-[14px] font-semibold tracking-[2.24px]">
          {label}
        </label>
        {rightSlot}
      </div>
      <textarea
        type={type}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className={inputCmsClasses}
      />
    </div>
  );
}

export default CmsTextarea