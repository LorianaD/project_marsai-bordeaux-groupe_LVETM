import CmsHideToggle from "../Fields/CmsHideToggle"

function CmsTitleBlock({ title, toggleName, values, handleChange, page, section, locale }) {
    return(
        <>
            <div className="w-full flex justify-between items-center uppercase">
                <h4 className="text-[16px] md:text-[20px] font-semibold tracking-[2.24px]">
                    { title }
                </h4>
                {toggleName && (
                    <CmsHideToggle name={ toggleName } value={ values?.[`${toggleName}_is_active`] } values={ values } onChange={ handleChange } page={ page } section={ section } locale={ locale } />
                )}
            </div>
        </>
    )
}

export default CmsTitleBlock

// <CmsTitleBlock title="Gestion des boutons"/>