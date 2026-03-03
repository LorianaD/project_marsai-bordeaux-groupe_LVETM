function CmsFieldsRow({ children, className = "" }) {
    return(
        <div className={`w-full flex items-center justify-between gap-[16px] ${className}`}>
            { children }
        </div>
    )
}

export default CmsFieldsRow