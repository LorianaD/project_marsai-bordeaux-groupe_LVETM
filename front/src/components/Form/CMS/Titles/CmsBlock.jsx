function CmsBlock({ children, className = "" }) {
    return(
        <>
            <div className={`flex flex-col pl-[10px] justify-start gap-[30px] self-stretch uppercase placeholder:uppercase w-full ${className}`} >
                { children }
            </div>
        </>
    )
}

export default CmsBlock