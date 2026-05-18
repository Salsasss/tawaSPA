export function useCurrency() {
    const mxn = (value) =>
        new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(Number(value ?? 0))
    return { mxn }
}
