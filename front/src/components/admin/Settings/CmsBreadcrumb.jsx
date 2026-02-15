function CmsBreadcrumb({ pageLabel, sectionLabel }) {
    return (
        <div className="text-[12px] text-black/50 dark:text-white/50">
            CMS / {pageLabel ?? "—"} / {sectionLabel ?? "—"}
        </div>
    );
}

export default CmsBreadcrumb