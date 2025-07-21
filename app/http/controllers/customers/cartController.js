function cartController() {
    return {
        index(req, res) {
            res.render('customers/cart')
        },

        update(req, res) {
            if (!req.session.cart) {
                req.session.cart = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0
                }
            }

            const cart = req.session.cart
            const itemId = req.body._id

            if (!cart.items[itemId]) {
                cart.items[itemId] = {
                    item: req.body,
                    qty: 1
                }
            } else {
                cart.items[itemId].qty += 1
            }

            cart.totalQty += 1
            cart.totalPrice += req.body.price

            return res.json({
                totalQty: cart.totalQty,
                totalPrice: cart.totalPrice
            })
        },

        removeItem(req, res) {
            const cart = req.session.cart
            const itemId = req.body._id

            if (cart && cart.items[itemId]) {
                const item = cart.items[itemId]
                cart.totalQty -= item.qty
                cart.totalPrice -= item.item.price * item.qty
                delete cart.items[itemId]

                // Reset cart if empty
                if (Object.keys(cart.items).length === 0) {
                    req.session.cart = null
                }
            }

            return res.json({
                totalQty: req.session.cart ? req.session.cart.totalQty : 0,
                totalPrice: req.session.cart ? req.session.cart.totalPrice : 0
            })
        },

        incrementItem(req, res) {
            const cart = req.session.cart
            const itemId = req.body._id

            if (cart && cart.items[itemId]) {
                cart.items[itemId].qty += 1
                cart.totalQty += 1
                cart.totalPrice += cart.items[itemId].item.price
            }

            return res.json({
                totalQty: cart.totalQty,
                totalPrice: cart.totalPrice
            })
        },

        decrementItem(req, res) {
            const cart = req.session.cart
            const itemId = req.body._id

            if (cart && cart.items[itemId]) {
                cart.items[itemId].qty -= 1
                cart.totalQty -= 1
                cart.totalPrice -= cart.items[itemId].item.price

                if (cart.items[itemId].qty <= 0) {
                    delete cart.items[itemId]
                }

                // Reset cart if empty
                if (cart.totalQty <= 0 || Object.keys(cart.items).length === 0) {
                    req.session.cart = null
                }
            }

            return res.json({
                totalQty: req.session.cart ? req.session.cart.totalQty : 0,
                totalPrice: req.session.cart ? req.session.cart.totalPrice : 0
            })
        },

        getCartData(req, res) {
            const cart = req.session.cart || { items: {}, totalQty: 0, totalPrice: 0 }
            return res.json(cart)
        }
    }
}

module.exports = cartController
