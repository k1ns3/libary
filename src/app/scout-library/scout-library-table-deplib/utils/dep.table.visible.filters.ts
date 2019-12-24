export function isRed(items): boolean {
    return 1 < items.depsLength && !items.notLatestVersion;
}

export function isMultiple(items): boolean {
    return 1 < items.depsLength && items.notLatestVersion;
}

export function isNotLatest(items): boolean {
    return 1 === items.depsLength && items.notLatestVersion;
}

export function isDarkColorVersion(items): boolean {
    for (const item of items.dep) {
        if (item.firstPartVersion) {
            return item.firstPartVersion;
        }
    }
}
export function isMediumColorVersion(items): boolean {
    for (const item of items.dep) {
        if (item.secondPartVersion) {
            return item.secondPartVersion;
        }
    }
}
export function islightColorVersion(items): boolean {
    for (const item of items.dep) {
        if (item.lastPartVersion) {
            return item.lastPartVersion;
        }
    }
}

export function isNPM(items): boolean {
    return items.type === 0;
}
export function isScout(items): boolean {
    return items.type === 1;
}
