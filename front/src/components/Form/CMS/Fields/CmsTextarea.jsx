import { inputCmsClasses } from "../../../../utils/formInputClasses.js";

function CmsTextarea({ name, label, type = "text", value, onChange, placeholder, rows = 4, rightSlot = null, required = false }) {
    return (
        <div className="flex flex-col pb-[10px] w-full justify-start gap-[16px] self-stretch uppercase placeholder:uppercase">
            <div className="flex justify-between flex-col md:flex-row">
                <label htmlFor={name} className="text-[14px] font-semibold tracking-[2.24px]">
                    {label}
                </label>
                {rightSlot}
            </div> 
            <textarea type={type} name={name} value={value ?? ""} onChange={onChange} placeholder={placeholder} rows={rows} 
                className="uppercase placeholder:uppercase placeholder:text-[rgba(255, 255, 255, 0.70)] placeholder:text-[14px] placeholder:tracking-[2.24px] flex py-[11px] px-[21px] items-center self-stretch gap-[10px] rounded-[5px] border border-[rgba(0,0,0,0.10)] bg-[rgba(0,0,0,0.07)] dark:border-[rgba(255,255,255,0.10)] dark:bg-[rgba(255,255,255,0.07)] backdrop-blur-[2.4px]"
            />
        </div>
    );
}

export default CmsTextarea;
