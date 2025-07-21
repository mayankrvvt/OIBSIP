const Menu = require('../../models/menu')

function homeController() {
  return {
    async index(req, res) {
      try {
        const pizzas = await Menu.find()
        return res.render('home', {
          pizzas: pizzas,
          showLogo: true, // This enables animated text in header.ejs on homepage only
          user: req.user  // Pass user if needed for header/navbar logic
        })
      } catch (err) {
        console.error("Error fetching pizzas:", err)
        return res.status(500).send("Something went wrong.")
      }
    }
  }
}

module.exports = homeController
