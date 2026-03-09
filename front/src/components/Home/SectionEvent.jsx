import { Link } from "react-router"
import { useTranslation } from "react-i18next";

import useCmsContent from "../../hooks/useCmsContent";
import { isSectionVisible, isVisible } from "../../utils/isVisible";
import { resolveCmsAsset } from "../../utils/cmsAssets";

function SectionEvent() {

    const { t, i18n } = useTranslation("home");
    const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

    const page = "home";
    const section = "events";

    const listFields = [
        { key: "list_item1", fallback: "events.list.item1" },
        { key: "list_item2", fallback: "events.list.item2" },
        { key: "list_item3", fallback: "events.list.item3" },
    ];

    const cards = [1, 2, 3];

    const { content, loading, message } = useCmsContent(page, locale);

    const ctaAgendaIconSrc = resolveCmsAsset(content?.[page]?.[section]?.ctaAgenda_icon);

    function getCardIconSrc(n) {
       return resolveCmsAsset(content?.[page]?.[section]?.[`card${n}_icon`]); 
    }

    return(
        <>
            {isSectionVisible(content, page, section) && (
                <section className="flex flex-col items-center gap-5 md:gap-24 md:py-32 p-5 md:px-24.75 self-stretch">

                    <div className="flex flex-col gap-5 md:gap-16.5 items-start w-full">

                        <h2 className="text-[#000000] dark:text-[#FFFFFF] text-[48px] md:text-[72px] leading-[43.2px] md:leading-[64.8px] font-bold tracking-[-2.4px] md:tracking-[-3.6px] uppercase text-left">
                            
                            {isVisible(content, page, section, "title_main") && (
                                <span>{content?.[page]?.[section]?.title_main}</span>
                            )}

                            {isVisible(content, page, section, "title_accent") && (
                                <span className="block text-[#AD46FF] mt-3">
                                    {content?.[page]?.[section]?.title_accent}
                                </span>
                            )}

                        </h2>

                        <div className="text-[#000000] dark:text-[#FFFFFF] text-[20px] leading-[32.5px] text-left">
                            <ol className="list-decimal gap-5 px-5 md:p-5">
                                {listFields
                                    .filter(({ key }) => isVisible(content, page, section, key))
                                    .map(({ key }) => (
                                        <li key={key}>
                                            {content?.[page]?.[section]?.[key]}
                                        </li>
                                    ))
                                }
                            </ol>
                        </div>
                        <Link to={content?.[page]?.[section]?.ctaAgenda_link} className="flex h-10.5 px-6.25 py-3.25 gap-2 justify-center items-center rounded-[100px] border-[rgba(15,15,15,0.1)] bg-[rgba(0,0,0,0.05)] dark:border-white/15 dark:bg-white/15">
                            <div>
                                {ctaAgendaIconSrc ? (
                                    <img src={ctaAgendaIconSrc} alt={content?.[page]?.[section]?.ctaAgenda ?? ""} />
                                ) : null}
                            </div>
                            <span className="text-[#000000] dark:text-[#FFFFFF] text-center text-[12px] font-bold leading-4 tracking-[1.2px] uppercase">
                                {content?.[page]?.[section]?.ctaAgenda}
                            </span>
                        </Link>
                    </div>

                    
                    <div className="flex flex-col md:flex-row gap-8 self-stretch text-left py-5 w-full justify-center">
                        {cards
                        .filter((n) => isVisible(content, page, section, `card${n}_title`))
                        .map((n) => {
                            
                            const cardsIconSrc = getCardIconSrc(n);

                            return (
                                <div key={n} className="max-w-87.5 max-h-65 self-stretch row-start-1 row-span-1 col-start-1 col-span-1 justify-self-stretch rounded-[40px] border border-black/10 bg-[rgba(217,217,217,0.1)] p-10 flex flex-col gap-7.5 hover:border-[#F1F1F1]/60 hover:bg-[#F1F1F1]/60 hover:text-black w-full">
                                    <div className="h-10 w-10">
                                        {cardsIconSrc ? (
                                            <img src={cardsIconSrc} alt={content?.[section]?.[`card${n}_title`]} />
                                        ) : null}
                                    </div>
                                    <h3 className="text-[30px] font-bold leading-9 tracking-[-1.5px] uppercase">
                                        {content?.[page]?.[section]?.[`card${n}_title`]}
                                    </h3>
                                    <p className="text-[14px] font-normal leading-[22.75px]">
                                        {content?.[page]?.[section]?.[`card${n}_description`]}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                    
                </section>
            )}
        </>
    )
}

export default SectionEvent