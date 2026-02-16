import { useEffect, useState } from "react";

function CmsInputImage({name, label, valueUrl, onChange, placeholder, type = "file", rightSlot = null, accept = "image/*"}) {
    
    const [ previewUrl, setPrevieuwUrl ] = useState("");

    useEffect(
        function imagePreviewManagement() {
        if (valueUrl) {
            setPrevieuwUrl(valueUrl);
        } else {
            setPrevieuwUrl("");
        }
    }, [valueUrl] );

    function handleFileChange(event) {
        if (onChange) {
            onChange(event);
        }

        const file = event.target.file && event.target.files[0];

        if (!file) {
            setPrevieuwUrl(valueUrl || "");
            return;
        }

        const url = URL.createObjectURL(file);
        setPrevieuwUrl(url);

    }

    return(
        <div className="flex flex-col pb-[10px] w-full justify-start gap-[16px] self-stretch uppercase placeholder:uppercase">
            <div className="flex justify-between items-between md:flex-row">
                <label htmlFor={name} className="text-[14px] font-semibold tracking-[2.24px]">
                    { label }
                </label>
                {rightSlot}
            </div> 
            <input type={type} name={name} onChange={handleFileChange} className="placeholder:uppercase placeholder:text-[rgba(255, 255, 255, 0.70)] placeholder:text-[14px] placeholder:tracking-[2.24px] flex py-[11px] px-[21px] items-center self-stretch gap-[10px] rounded-[5px] border border-[rgba(0,0,0,0.10)] bg-[rgba(0,0,0,0.07)] dark:border-[rgba(255,255,255,0.10)] dark:bg-[rgba(255,255,255,0.07)] backdrop-blur-[2.4px]"/>
            {previewUrl ? (
                <img src={previewUrl} alt="" className="h-[56px] w-[56px] object-contain rounded-[8px] border border-white/10 bg-white/5" />
            ) : (
                <p className="text-xs normal-case opacity-70">
                    { placeholder || "Aperçu image" }
                </p>
            )}
        </div>
    )
}

export default CmsInputImage