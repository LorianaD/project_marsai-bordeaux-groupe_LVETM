import Localisation from "../Maps/Localisation"
import iconLocalisation from "../../assets/imgs/icones/IconLocalisation.svg"
import { useTranslation } from "react-i18next";

function SectionLocalisation() {

    const { t } = useTranslation("home");
    const spaces = t("localisationEvent.spaces", {
        returnObjects: true,
        defaultValue: []
    });

    return(
        <section className="flex flex-col items-start gap-[30px] p-[20px] md:py-[100px] md:px-[75px] self-stretch text-[#000000] dark:text-[#FFFFFF]">
            
            {/* eyebrow */}
            <div className="max-w-[200px] h-[42px] flex items-center justify-center gap-[9px] px-[25px] py-[9px] rounded-full border border-[rgba(138,138,138,0.10)] bg-[rgba(0,0,0,0.05)]">
                <div className="w-[16px] h-[16px]">
                    <img src={iconLocalisation} alt="" />
                </div>
                <p className="text-center text-[12px] font-bold leading-[16px] tracking-[1.2px] uppercase">
                    {t("localisationEvent.eyebrow")}
                </p>
            </div>

            {/*  */}
            <div className="flex flex-col items-start md:items-center md:justify-center gap-[80px] md:px-6 self-stretch">
                <div className="flex flex-col items-start justify-between gap-[20px] md:gap-[50px]">
                    <h2 className="text-left text-[48px] md:text-[128px] font-bold leading-[48px] md:leading-[128px] tracking-[-2.4px] md:tracking-[-6.4px] capitalize">
                        {t("localisationEvent.venue.namePart1")}
                        <span className="block md:inline text-[#51A2FF] [-webkit-text-stroke-width:3px] [-webkit-text-stroke-color:#51A2FF] dark:[-webkit-text-stroke-width:3px] dark:[-webkit-text-stroke-color:#51A2FF]">
                            {t("localisationEvent.venue.namePart2")}
                        </span>
                    </h2>
                    <div className="flex flex-col md:flex-row md:items-center gap-[24px] md:gap-[30px] self-stretch">
                        <p className="text-[#51A2FF] text-left md:text-center text-[10px] font-bold leading-[15px] tracking-[4px] uppercase">
                            {t("localisationEvent.venue.cityTagline")}
                        </p>
                        <p className="text-left md:text-center text-[18px] font-bold leading-[29.25px]">
                            {t("localisationEvent.address.street")},{" "}
                            {t("localisationEvent.address.postalCode")}{" "}
                            {t("localisationEvent.address.city")}
                        </p>
                        <p className="text-left md:text-center text-[14px] font-normal leading-[22.75px] tracking-[1.4px] uppercase">
                            {t("localisationEvent.access.tram")}
                        </p>
                    </div>
                </div>
                <div className="w-full md:w-[976px] md:h-[156px] flex flex-col md:flex-row gap-[32px] text-left">
                    {spaces.map((space, i) => (
                        <div key={i} className="flex flex-col items-start gap-[16px] px-[41px] py-[24px] self-stretch justify-self-stretch col-span-1 row-span-1 rounded-[32px] border border-[rgba(0,0,0,0.20)] bg-[rgba(138,138,138,0.10)]">
                            <h3 className="text-[#51A2FF] text-[24px] font-bold leading-[32px] tracking-[-1.2px] underline uppercase" style={{ color: space.color }}>
                                {space.name}
                            </h3>
                            <p className="text-[16px] font-normal leading-[26px]">
                                {space.description}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="rounded-[40px] border border-[rgba(138,138,138,0.10)] bg-transparent shadow-[0_0_100px_rgba(0,0,0,0.50)]">
                    < Localisation />
                </div>
            </div>
        </section>
    )
}

export default SectionLocalisation