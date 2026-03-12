import iconPaintDark from "../../../../assets/imgs/icones/IconPaintDark.svg";
import iconPaint from "../../../../assets/imgs/icones/IconPaint.svg";
import CmsHideToggle from "../Fields/CmsHideToggle";

function CmsFormHeader({ title, toggleName, values, handleChange, page, section, locale }) {

    const toggleValue = toggleName ? (values?.[`${toggleName}_is_active`] ?? values?.[toggleName] ?? 1) : undefined;

    return(
        <>
            {/***** Titre du formulaire *****/}
            <div className="flex items-center justify-between gap-[10px] self-stretch uppercase">
                <div className="flex items-center gap-[10px]">
                    <div>
                        <img src={ iconPaintDark } alt="" className="hidden dark:block"/>
                        <img src={ iconPaint } alt="" className="block dark:hidden"/>
                    </div>
                    <h3 className="text-[20px] md:text-[30px] font-bold tracking-[3.2px] uppercase">
                        { title }
                    </h3>                        
                </div>
                {toggleName && (
                    <CmsHideToggle name={ toggleName } value={ toggleValue } values={ values } onChange={ handleChange } page={ page } section={ section } locale={ locale } />
                )}
            </div>
        </>
    )

}

export default CmsFormHeader