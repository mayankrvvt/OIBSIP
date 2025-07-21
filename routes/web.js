// Import controllers
const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const orderController = require('../app/http/controllers/customers/orderController')
const adminOrderController = require('../app/http/controllers/admin/orderController')
const statusController = require('../app/http/controllers/admin/statusController')

// Import middlewares
const guest = require('../app/http/middlewares/guest')
const auth = require('../app/http/middlewares/auth')
const admin = require('../app/http/middlewares/admin')

// Stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

function initRoutes(app) {
    // Public routes
    app.get('/', homeController().index)
    app.get('/login', guest, authController().login)
    app.post('/login', authController().postLogin)
    app.get('/register', guest, authController().register)
    app.post('/register', authController().postRegister)
    app.post('/logout', authController().logout)

    // Cart routes
    app.get('/cart', cartController().index)
    app.post('/update-cart', cartController().update)
    app.post('/remove-from-cart', cartController().removeItem)
    app.post('/increment-cart', cartController().incrementItem)
    app.post('/decrement-cart', cartController().decrementItem)
    app.get('/cart-data', cartController().getCartData)

    // Customer routes
    app.post('/orders', auth, orderController().store)
    app.get('/customer/orders', auth, orderController().index)
    app.get('/customer/orders/:id', auth, orderController().show)

    // Admin routes
    app.get('/admin/orders', admin, adminOrderController().index)
    app.post('/admin/order/status', admin, statusController().update)

    // Stripe payment result pages
    app.get('/payment-success', (req, res) => {
        res.render('payment/success')
    })

    app.get('/payment-cancel', (req, res) => {
        res.render('payment/cancel')
    })

    // Stripe Checkout session route
    app.post('/create-checkout-session', auth, async (req, res) => {
        try {
            const { phone, address, total } = req.body

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [{
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: 'Pizza Order',
                            description: `Phone: ${phone}, Address: ${address}`
                        },
                        unit_amount: parseInt(total), // total in paise
                    },
                    quantity: 1,
                }],
                mode: 'payment',
                success_url: `${req.protocol}://${req.get('host')}/payment-success`,
                cancel_url: `${req.protocol}://${req.get('host')}/payment-cancel`,
            })

            res.status(200).json({ id: session.id })
        } catch (err) {
            console.error('Stripe session error:', err)
            res.status(500).json({ error: 'Failed to create Stripe session' })
        }
    })
}

module.exports = initRoutes
