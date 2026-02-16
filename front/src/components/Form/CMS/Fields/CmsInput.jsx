function CmsInput({name, label, value, onChange, placeholder, type = "text", rightSlot = null}) {

    return(
        <div className="flex flex-col pb-[10px] w-full justify-start gap-[16px] uppercase placeholder:uppercase">
            <div className="flex justify-between md:flex-row w-full">
                <label htmlFor={name} className="text-[14px] font-semibold tracking-[2.24px] w-full">
                    { label }
                </label>
                {rightSlot}
            </div> 
            <input type={type} name={name} value={value ?? ""} onChange={onChange} placeholder={placeholder} className="placeholder:uppercase placeholder:text-[rgba(255, 255, 255, 0.70)] placeholder:text-[14px] placeholder:tracking-[2.24px] flex py-[11px] px-[21px] items-center self-stretch gap-[10px] rounded-[5px] border border-[rgba(0,0,0,0.10)] bg-[rgba(0,0,0,0.07)] dark:border-[rgba(255,255,255,0.10)] dark:bg-[rgba(255,255,255,0.07)] backdrop-blur-[2.4px] w-full"/>
        </div>
    )
}

export default CmsInput

// Exemple utilisation
// < CmsInput name="protocol" label="Protocol" value={values.protocol} onChange={handleChange} placeholder={t("hero.protocol")}   rightSlot={
//     <CmsHideToggle name="protocol" value={values.protocol_is_active} values={values} onChange={handleChange} page={page} section={section} locale={locale} order_index={orderIndexByKey.protocol} />}
// />