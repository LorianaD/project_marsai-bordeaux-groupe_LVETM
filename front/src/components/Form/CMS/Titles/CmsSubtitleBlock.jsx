import CmsHideToggle from "../Fields/CmsHideToggle"

function CmsSubtitleBlock({ title, toggleName, values, handleChange, page, section, locale }) {
    
    const toggleValue = toggleName ? values?.[`${toggleName}_is_active`] ?? values?.[toggleName] ?? 1 : undefined;
    
    return(
        <>
            <div className="flex justify-between items-center">
                <h5 className="text-[14px] md:text-[16px] font-bold tracking-[3.2px] uppercase">
                    { title }
                </h5>
                {toggleName && (
                    <CmsHideToggle name={ toggleName } value={ toggleValue } values={ values } onChange={ handleChange } page={ page } section={ section } locale={ locale } />
                )}
            </div>
        </>
    )
}

export default CmsSubtitleBlock

// <CmsSubtitleBlock title="Gestion du premier bouton" toggleName="ctaParticipate" values={values} handleChange={handleChange} page={page} section={section} locale={locale} />