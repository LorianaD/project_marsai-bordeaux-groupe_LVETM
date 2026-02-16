import { Link } from "react-router"
import { useTranslation } from "react-i18next";

import IconCalendar from "../../assets/imgs/icones/IconCalendar.svg";
import IconPlay from "../../assets/imgs/icones/IconPlay.svg";
import IconAward from "../../assets/imgs/icones/IconAward.svg";
import IconPeople from "../../assets/imgs/icones/IconPeople.svg";
import useCmsContent from "../../hooks/useCmsContent";
import isVisible from "../../utils/isVisible";

function SectionEvent() {

    const { t, i18n } = useTranslation("home");
    const locale = i18n.language?.startsWith("fr") ? "fr" : "en";

    const section = "events";

    const cards = [1, 2, 3];

    const { content, loading, message } = useCmsContent(locale);

    return(
        <section className="flex flex-col items-center gap-[20px] md:gap-[96px] md:py-[128px] p-[20px] md:px-[99px] self-stretch">

            <div className="flex flex-col gap-[20px] md:gap-[66px] items-start w-full">

                <h2 className="text-[#000000] dark:text-[#FFFFFF] text-[48px] md:text-[72px] leading-[43.2px] md:leading-[64.8px] font-bold tracking-[-2.4px] md:tracking-[-3.6px] uppercase text-left">
                    
                    {isVisible(content, section, "title_main") && (
                        <span>{content?.[section]?.title_main || t("events.title_main")}</span>
                    )}

                    {isVisible(content, section, "title_main") && (
                        <span className="block text-[#AD46FF] mt-3">
                            {content?.[section]?.title_accent || t("events.title_accent")}
                        </span>
                    )}

                </h2>

                <div className="text-[#000000] dark:text-[#FFFFFF] text-[20px] leading-[32.5px] text-left">
                    <ol className="list-decimal gap-[20px] px-[20px] md:p-[20px]">
                        <li>{content?.[section]?.item1 || t("events.list.item1")}</li>
                        <li>{content?.[section]?.item2 || t("events.list.item2")}</li>
                        <li>{content?.[section]?.item3 || t("events.list.item3")}</li>
                    </ol>
                </div>
                <Link to={content?.[section]?.ctaAgenda_link || t("events.ctaAgenda_link")} className="flex h-[42px] px-[25px] py-[13px] gap-[8px] justify-center items-center rounded-[100px] border-[rgba(15,15,15,0.1)] bg-[rgba(0,0,0,0.05)] dark:border-white/10 dark:bg-white/5">
                    <div>
                        <img src={content?.[section]?.ctaAgenda_icon || t("events.ctaAgenda_icon")} alt="" />
                    </div>
                    <span className="text-[#000000] dark:text-[#FFFFFF] text-center text-[12px] font-bold leading-[16px] tracking-[1.2px] uppercase">
                        {content?.[section]?.ctaAgenda || t("events.ctaAgenda")}
                    </span>
                </Link>
            </div>

            <div className="flex flex-col md:flex-row gap-8 self-stretch text-left py-[20px]">

                <div className="h-[260px] self-stretch row-start-1 row-span-1 col-start-1 col-span-1 justify-self-stretch rounded-[40px] border border-black/10 bg-[rgba(217,217,217,0.05)] p-[40px] flex flex-col gap-[30px] hover:border-[#F1F1F1] hover:bg-[#F1F1F1] hover:text-black">
                    <div className="h-[40px] w-[40px]">
                        <img src={IconPlay} alt="" />
                    </div>
                    <h3 className="text-[30px] font-bold leading-[36px] tracking-[-1.5px] uppercase">
                        {content?.[section]?.card1_title || t("events.cards.card1.title")}
                    </h3>
                    <p className="text-[14px] font-normal leading-[22.75px]">
                        {content?.[section]?.card1_description || t("events.cards.card1.description")}
                    </p>
                </div>
                <div className="h-[260px] self-stretch row-start-1 row-span-1 col-start-2 col-span-1 justify-self-stretch rounded-[40px] border border-black/10 bg-[rgba(217,217,217,0.05)] p-[40px] flex flex-col gap-[30px] hover:border-[#F1F1F1] hover:bg-[#F1F1F1] hover:text-black">
                    <div className="h-[40px] w-[40px]">
                        <img src={IconPeople} alt="" />
                    </div>
                    <h3 className="text-[30px] font-bold leading-[36px] tracking-[-1.5px] uppercase">
                        {content?.[section]?.card2_title || t("events.cards.card2.title")}
                    </h3>
                    <p className="text-[14px] font-normal leading-[22.75px]">
                        {content?.[section]?.card2_description || t("events.cards.card2.description")}
                    </p>
                </div>
                <div className="h-[260px] self-stretch row-start-1 row-span-1 col-start-3 col-span-1 justify-self-stretch rounded-[40px] border border-black/10 bg-[rgba(217,217,217,0.05)] p-[40px] flex flex-col gap-[30px] hover:border-[#F1F1F1] hover:bg-[#F1F1F1] hover:text-black">
                    <div className="h-[40px] w-[40px]">
                        <img src={IconAward} alt="" />
                    </div>
                    <h3 className="text-[30px] font-bold leading-[36px] tracking-[-1.5px] uppercase">
                        {content?.[section]?.card3_title || t("events.cards.card3.title")}
                    </h3>
                    <p className="text-[14px] font-normal leading-[22.75px]">
                        {content?.[section]?.card3_description || t("events.cards.card3.description")}
                    </p>
                </div>

            </div>

        </section>
    )
}

export default SectionEvent