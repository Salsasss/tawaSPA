import { defineStore } from 'pinia'

const STORAGE_KEY = 'tawa_cart_v2'

function loadCart() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        return raw ? JSON.parse(raw) : []
    } catch {
        return []
    }
}

function saveCart(items) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
        // ignore
    }
}

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: loadCart(), // [{ id, name, price, image, qty, notes?, ingredients? }]
    }),

    getters: {
        countItems: (state) => state.items.reduce((acc, it) => acc + it.qty, 0),
        subtotal: (state) => state.items.reduce((acc, it) => acc + it.price * it.qty, 0),
        iva: (state) => Math.round(state.items.reduce((acc, it) => acc + it.price * it.qty, 0) * 0.16 * 100) / 100,
        total() {
            return Math.round((this.subtotal + this.iva) * 100) / 100
        },
        getQtyById: (state) => (id) => state.items.find(i => i.id === id)?.qty ?? 0,
    },

    actions: {
        _commit() {
            saveCart(this.items)
        },

        addItem(product) {
            const found = this.items.find(i => i.id === product.id)
            if (found) {
                found.qty += 1
            } else {
                this.items.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image ?? null,
                    qty: 1,
                    notes: '',
                    ingredients: product.ingredients ?? null,
                })
            }
            this._commit()
        },

        increment(id) {
            const found = this.items.find(i => i.id === id)
            if (!found) return
            found.qty += 1
            this._commit()
        },

        decrement(id) {
            const found = this.items.find(i => i.id === id)
            if (!found) return
            found.qty -= 1
            if (found.qty <= 0) {
                this.items = this.items.filter(i => i.id !== id)
            }
            this._commit()
        },

        remove(id) {
            this.items = this.items.filter(i => i.id !== id)
            this._commit()
        },

        clear() {
            this.items = []
            this._commit()
        },

        setNotes(id, notes) {
            const found = this.items.find(i => i.id === id)
            if (!found) return
            found.notes = notes
            this._commit()
        },
    },
})
