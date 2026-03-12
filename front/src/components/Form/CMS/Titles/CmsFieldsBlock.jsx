function CmsFieldsBlock({ children, className = "" }) {
    return(
        <div className={`flex flex-wrap w-full pl-[10px] gap-[30px] md:justify-between md:items-end uppercase placeholder:uppercase ${className}`}>
            { children }
        </div>
    )
}

export default CmsFieldsBlock