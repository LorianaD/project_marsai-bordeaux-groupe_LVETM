// fonctions qui gere l'affichage
function isVisible(content, page, section, key) {
    // console.log("fonction isVisible OK");
    // console.log("content:", content);
    // console.log("section:", section);
    // console.log("key:", key);
        
    // on recupere le 
    const contentSection = content?.[page]?.[section];

    // il est par defaut visible
    if (!contentSection) {
        return true;
    }

    // clé "key_is_active" stockée à plat (en ligne)
    const flat = contentSection[`${key}_is_active`];

    if (flat !== undefined && flat !== null) {
        return Number(flat) === 1;
    }

    // il stock en block
    const item = contentSection[key];

    if (item && typeof item === "object") {
        const active = item.is_active;
        if (active !== undefined && active !== null) {
            return Number(active) === 1;
        }
    }

    return true;

}

function isSectionVisible(content, page, section) {
    // console.log("fonction isSectionVisible OK");
    
    return Number(content?.[page]?.[section]?.section_visibility_is_active ?? 1) === 1;
}

export { isVisible, isSectionVisible }