function CmsHideToggle({ name, value = 1, onChange }) {

    const isActive = Number(value) === 1;

    const toggle = () => {

        const next = isActive ? 0 : 1;

        console.log("toggle:", name, next);

        onChange({
            target: {
                name: `${name}_is_active`,
                value: next,
            },
        });

    };

    return (
        <label className="flex items-center gap-2 text-sm cursor-pointer">
            <span>Caché</span>

            <button type="button" role="switch" aria-checked={!isActive} onClick={toggle} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${ isActive ? "bg-green-500" : "bg-gray-300" }`} >
                <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${ isActive ? "translate-x-5" : "translate-x-1" }`} />
            </button>
        </label>
    );
}

export default CmsHideToggle;