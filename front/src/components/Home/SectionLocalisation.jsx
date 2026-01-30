function SectionLocalisation() {
    return(
        <section className="flex flex-col gap-[30px] py-[100px] px-[75px] self-stretch text-[#000000] dark:text-[#FFFFFF]">
            <div className="w-[149px] h-[42px] flex items-center justify-center gap-[9px] px-[25px] py-[9px] rounded-full border border-[rgba(138,138,138,0.10)] bg-[rgba(0,0,0,0.05)]">
                <div className="w-[16px] h-[16px]">
                    <img src="src/assets/imgs/icones/iconLocalisation.svg" alt="" />
                </div>
                <p className="text-center text-[12px] font-bold leading-[16px] tracking-[1.2px] uppercase">Le lieu</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-[80px] px-6 self-stretch">
                <div className="flex flex-col items-start gap-[50px]">
                    <h2 className="text-right text-[128px] font-bold leading-[128px] tracking-[-6.4px] capitalize text-left">
                        La
                        <span className="text-[#51A2FF] [-webkit-text-stroke-width:3px] [-webkit-text-stroke-color:#51A2FF] dark:[-webkit-text-stroke-width:3px] dark:[-webkit-text-stroke-color:#51A2FF]">Plateforme</span>
                    </h2>
                    <div className="flex items-center gap-[30px] self-stretch">
                        <p className="text-[#51A2FF] text-center text-[10px] font-bold leading-[15px] tracking-[4px] uppercase">Marseille, Hub Créatif</p>
                        <p className="text-center text-[18px] font-bold leading-[29.25px]">12 Rue d'Uzes, 13002 Marseille</p>
                        <p className="text-center text-[14px] font-normal leading-[22.75px] tracking-[1.4px] uppercase">Accès Tram T2/T3 Arrêt Arenc Le Silo</p>
                    </div>
                </div>
                <div className="grid w-[976px] h-[156px] grid-cols-2 gap-[32px] text-left">
                    <div className="flex flex-col items-start gap-[16px] px-[41px] py-[24px] self-stretch justify-self-stretch col-span-1 row-span-1 rounded-[32px] border border-[rgba(0,0,0,0.20)] bg-[rgba(138,138,138,0.10)]">
                        <h3 className="text-[#51A2FF] text-[24px] font-bold leading-[32px] tracking-[-1.2px] underline uppercase">
                            Salle des Sucres
                        </h3>
                        <p className="text-[16px] font-normal leading-[26px]">Futur sanctuaire des conférences et de la remise des prix de Mars.A.I. Un espace majestueux alliant patrimoine et technologie.</p>
                    </div>
                    <div className="flex flex-col items-start gap-[16px] px-[41px] py-[24px] self-stretch justify-self-stretch col-span-1 row-span-1 rounded-[32px] border border-[rgba(0,0,0,0.20)] bg-[rgba(138,138,138,0.10)]">
                        <h3 className="text-[#C27AFF] text-[24px] font-bold leading-[32px] tracking-[-1.2px] underline uppercase">
                            Salle PLAZA
                        </h3>
                        <p className="text-[16px] font-normal leading-[26px]">
                            L'épicentre du festival : accueil, animations, workshops et restauration. Le point de rencontre de tous les participants.
                        </p>
                    </div>
                </div>
                <div className="rounded-[40px] border border-[rgba(138,138,138,0.10)] bg-transparent shadow-[0_0_100px_rgba(0,0,0,0.50)]">
                    <div className="relative w-full aspect-[16/7]">
                        <iframe
                        title="Google Map"
                        className="absolute inset-0 h-full w-full border-0"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        // Remplace l'URL par ton embed
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!...etc"
                        allowFullScreen
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SectionLocalisation

// dark:text-transparent