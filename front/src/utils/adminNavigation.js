import { ADMIN_NAV } from "../components/admin/adminNav";

function getAdminActiveKey(pathname) {

    let best = null;

    for (const item of ADMIN_NAV) {

        if (pathname.startsWith(item.path)) {

            if (!best || item.path.length > best.path.length) {

                best = item;
                
            }

        }

    }

    return best ? best.id : "dashboard";
}

export default getAdminActiveKey