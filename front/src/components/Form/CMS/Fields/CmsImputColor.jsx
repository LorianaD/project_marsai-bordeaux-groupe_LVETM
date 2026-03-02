function CmsInputColor({name, label, value, onChange, placeholder, type = "color", rightSlot = null, defaultColor = "#2B7FFF",}) {

    let safeValue;

    if (type === "color") {

        if (typeof value === "string" && value.startsWith("#")) {

            safeValue = value;

        } else {

            safeValue = defaultColor;

        }
    } else {

        safeValue = value ?? "";

    }

    function isLightColor(hex) {
        if (!hex || !hex.startsWith("#")) return false;

        const c = hex.substring(1);
        const rgb = parseInt(c, 16);
        const r = (rgb >> 16) & 255;
        const g = (rgb >> 8) & 255;
        const b = rgb & 255;

        const brightness = (r * 299 + g * 587 + b * 114) / 1000;

        return brightness > 155;
    }

    return(
        <div className="flex flex-col w-20 items-center justify-start gap-[16px] uppercase placeholder:uppercase">

            <div className="flex justify-between md:flex-row w-full">
                <label htmlFor={name} className="text-[14px] font-semibold tracking-[2.24px] w-full m-[5px]">
                    { label }
                </label>
                {rightSlot}
            </div>

            {type === "color" ? (
                <div className="w-[30px] h-[30px] relative">
                    <div
                        className="w-full h-full rounded-[6px] ring-1 ring-black/20 dark:ring-white/30 shadow-sm"
                        style={{ backgroundColor: safeValue }}
                    />
                
                    <input id={name} type={type} name={name} value={safeValue} onChange={onChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                </div>
            ) : (
                <input type={type} name={name} value={safeValue} onChange={onChange} placeholder={placeholder} className="flex py-[11px] px-[21px] items-center justify-center self-stretch gap-[10px] rounded-[5px] border border-[rgba(0,0,0,0.10)] bg-[rgba(0,0,0,0.07)] dark:border-[rgba(255,255,255,0.10)] dark:bg-[rgba(255,255,255,0.07)] backdrop-blur-[2.4px]" />
            )}
            {/* <input type={type} name={name} value={safeValue} onChange={onChange} placeholder={placeholder}
                style={
                    type === "color" ? { background: safeValue, color: isLightColor(safeValue) ? "#000" : "#fff" } : underfined
                }
                className="flex py-[11px] px-[21px] items-center justify-center self-stretch gap-[10px] rounded-[5px] border border-[rgba(0,0,0,0.10)] bg-[rgba(0,0,0,0.07)] dark:border-[rgba(255,255,255,0.10)] dark:bg-[rgba(255,255,255,0.07)] backdrop-blur-[2.4px]"
            /> */}
            
        </div>
    )
}

export default CmsInputColor;