import { updateActiveApi } from "../../../../services/CMS/UpdateContentApi";


function CmsHideToggle({ name, value = 1, values, onChange, page, section, locale, order_index }) {

    // 1 = visible, 0 = caché
    const isActive = Number(value) === 1;

    const toggle = async () => {
        console.log("Fonction toogle OK");

        const next = isActive ? 0 : 1;
        console.log("le isActive est:", next);
        
        onChange({
            target: {
                name: `${name}_is_active`,
                value: next,
            }
        })

        try {
            await updateActiveApi({
                page,
                section,
                locale,
                content_key: name,
                order_index,
                is_active: next
            })
        } catch (error) {
            console.error("Toggle update failed:", error);
            
            onChange({
                target: {
                    name: `${name}_is_active`,
                    value: isActive ? 1 : 0,
                }
            })

        }

    };

    return (
        <label className="flex items-center gap-2 text-sm cursor-pointer">
            <span>Caché</span>

            <button type="button" role="switch" aria-checked={!isActive} onClick={toggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${ isActive ? "bg-green-500" : "bg-gray-300" }`}
            >
                <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${ isActive ? "translate-x-5" : "translate-x-1" }`} />
            </button>
        </label>
    );
}

export default CmsHideToggle;