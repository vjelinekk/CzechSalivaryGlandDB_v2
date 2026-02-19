export const toIntBool = (
    val: string | boolean | undefined | number | null
): number | null => {
    if (val === undefined || val === null) return null
    if (typeof val === 'boolean') return val ? 1 : 0
    if (typeof val === 'string') return val === 'Ano' ? 1 : 0
    if (typeof val === 'number') return val
    return 0
}

export const toStr = (val: string | number | undefined): string | null => {
    return val?.toString() || null
}

export const toNum = (
    val: string | number | undefined | null
): number | null => {
    if (val === undefined || val === null) return null
    if (typeof val === 'number') return val
    if (typeof val === 'string') return parseFloat(val) || 0
    return 0
}

// Reverse mapping helpers (Entity → DTO)
export const fromIntBool = (val: number | null | undefined): string | null => {
    if (val === null || val === undefined) return null
    return val === 1 ? 'Ano' : 'Ne'
}

export const fromIsAlive = (val: number | null | undefined): string | null => {
    if (val === null || val === undefined) return null
    return val === 1 ? 'Žije' : 'Zemřel'
}
