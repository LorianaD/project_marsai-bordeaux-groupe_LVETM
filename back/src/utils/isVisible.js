function isVisible(section, key) {
    // on recupere le 
    const contentSection = content?.[section];

    // il est par defaut visible
    if (!contentSection) {
        return true;
    }

    // clé "key_is_active" stockée à plat (en ligne)
    const flat = contentSection[`${key}_is_active`];

    if (flat !== undefined && flat !== null) {
        return Number(flat) === 1;
    }

    const item = contentSection[key];

    if (item && typeof item === "object") {
        const active = item.is_active;
        if (active !== undefined && active !== null) {
            return Number(active) === 1;
        }
    }

    return true;

}