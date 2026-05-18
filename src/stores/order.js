import { defineStore } from "pinia";

export const useOrderStore = defineStore("order", {
    state: () => ({
        /**
         * dine_in | takeaway | null
         * (puedes cambiar los strings si prefieres: 'here'/'to_go', etc.)
         */
        orderType: null,

        /**
         * cash | card | counter | null
         */
        paymentMethod: null,

        /**
         * Número de orden generado al confirmar (ej. "047")
         */
        orderNumber: null,

        /**
         * Porcentaje de propina: 0 | 10 | 15 | 20
         */
        tipPercent: 0,
    }),

    getters: {
        hasOrderType: (state) => !!state.orderType,
        isDineIn: (state) => state.orderType === "dine_in",
        isTakeaway: (state) => state.orderType === "takeaway",

        hasPaymentMethod: (state) => !!state.paymentMethod,
        paymentLabel: (state) => {
            const labels = {
                cash: "Efectivo",
                card: "Tarjeta",
                counter: "Pago en Caja",
            };
            return labels[state.paymentMethod] ?? "";
        },

        isConfirmed: (state) => !!state.orderNumber,
    },

    actions: {
        setOrderType(type) {
            // Defensa mínima
            const allowed = ["dine_in", "takeaway"];
            this.orderType = allowed.includes(type) ? type : null;
        },

        setPaymentMethod(method) {
            const allowed = ["cash", "card", "counter"];
            this.paymentMethod = allowed.includes(method) ? method : null;
        },

        /**
         * Establece el porcentaje de propina (0, 10, 15, 20)
         */
        setTip(percent) {
            const allowed = [0, 10, 15, 20];
            this.tipPercent = allowed.includes(percent) ? percent : 0;
        },

        /**
         * Guarda el número de orden generado por el backend
         */
        setOrderNumber(id) {
            this.orderNumber = String(id).padStart(3, "0");
        },

        resetOrder() {
            this.orderType = null;
            this.paymentMethod = null;
            this.orderNumber = null;
            this.tipPercent = 0;
        },
    },
});
