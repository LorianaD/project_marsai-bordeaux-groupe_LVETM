import { Link } from "react-router"
import { useTranslation } from "react-i18next";

import useCmsContent from "../../hooks/useCmsContent";
import isVisible from "../../utils/isVisible";
import { resolveCmsAsset } from "../../utils/cmsAssets";

function SectionEvent() {

    const { t, i18n } = useTranslation("home");
    const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

    const section = "events";

    const listFields = [
        { key: "list_item1", fallback: "events.list.item1" },
        { key: "list_item2", fallback: "events.list.item2" },
        { key: "list_item3", fallback: "events.list.item3" },
    ];

    const cards = [1, 2, 3];

    const { content, loading, message } = useCmsContent(locale);

    const ctaAgendaIconSrc = resolveCmsAsset(content?.[section]?.ctaAgenda_icon);

    function getCardIconSrc(n) {
       return resolveCmsAsset(content?.[section]?.[`card${n}_icon`]); 
    }

    return(
        <section className="flex flex-col items-center gap-[20px] md:gap-[96px] md:py-[128px] p-[20px] md:px-[99px] self-stretch">

            <div className="flex flex-col gap-[20px] md:gap-[66px] items-start w-full">

                <h2 className="text-[#000000] dark:text-[#FFFFFF] text-[48px] md:text-[72px] leading-[43.2px] md:leading-[64.8px] font-bold tracking-[-2.4px] md:tracking-[-3.6px] uppercase text-left">
                    
                    {isVisible(content, section, "title_main") && (
                        <span>{content?.[section]?.title_main}</span>
                    )}

                    {isVisible(content, section, "title_accent") && (
                        <span className="block text-[#AD46FF] mt-3">
                            {content?.[section]?.title_accent}
                        </span>
                    )}

                </h2>

                <div className="text-[#000000] dark:text-[#FFFFFF] text-[20px] leading-[32.5px] text-left">
                    <ol className="list-decimal gap-[20px] px-[20px] md:p-[20px]">
                        {listFields
                            .filter(({ key }) => isVisible(content, section, key))
                            .map(({ key }) => (
                                <li key={key}>
                                    {content?.[section]?.[key]}
                                </li>
                            ))
                        }
                    </ol>
                </div>
                <Link to={content?.[section]?.ctaAgenda_link} className="flex h-[42px] px-[25px] py-[13px] gap-[8px] justify-center items-center rounded-[100px] border-[rgba(15,15,15,0.1)] bg-[rgba(0,0,0,0.05)] dark:border-white/10 dark:bg-white/5">
                    <div>
                        {ctaAgendaIconSrc ? (
                            <img src={ctaAgendaIconSrc} alt={content?.[section]?.ctaAgenda ?? ""} />
                        ) : null}
                    </div>
                    <span className="text-[#000000] dark:text-[#FFFFFF] text-center text-[12px] font-bold leading-[16px] tracking-[1.2px] uppercase">
                        {content?.[section]?.ctaAgenda}
                    </span>
                </Link>
            </div>

            
            <div className="flex flex-col md:flex-row gap-8 self-stretch text-left py-[20px]">
                {cards
                .filter((n) => isVisible(content, section, `card${n}_title`))
                .map((n) => {
                    
                    const cardsIconSrc = getCardIconSrc(n);

                    return (
                        <div key={n} className="max-w-[350px] max-h-[260px] self-stretch row-start-1 row-span-1 col-start-1 col-span-1 justify-self-stretch rounded-[40px] border border-black/10 bg-[rgba(217,217,217,0.05)] p-[40px] flex flex-col gap-[30px] hover:border-[#F1F1F1] hover:bg-[#F1F1F1] hover:text-black">
                            <div className="h-[40px] w-[40px]">
                                {cardsIconSrc ? (
                                    <img src={cardsIconSrc} alt={content?.[section]?.[`card${n}_title`]} />
                                ) : null}
                            </div>
                            <h3 className="text-[30px] font-bold leading-[36px] tracking-[-1.5px] uppercase">
                                {content?.[section]?.[`card${n}_title`]}
                            </h3>
                            <p className="text-[14px] font-normal leading-[22.75px]">
                                {content?.[section]?.[`card${n}_description`]}
                            </p>
                        </div>
                    )
                })}
            </div>
            
        </section>
    )
}

export default SectionEvent