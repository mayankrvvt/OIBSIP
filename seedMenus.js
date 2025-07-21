const mongoose = require('mongoose');
const fs = require('fs');
const Menu = require('./app/models/menu');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/pizza', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.once('open', async () => {
  console.log('Connected to MongoDB');

  // Read and parse menus.json
  let menuData = JSON.parse(fs.readFileSync('./menus.json', 'utf-8'));

  // ❗ Remove Mongo-style _id
  menuData = menuData.map(item => {
    delete item._id;
    return item;
  });

  try {
    await Menu.deleteMany(); // Optional: clear old data
    await Menu.insertMany(menuData);
    console.log('✅ Menu items inserted successfully!');
  } catch (err) {
    console.error('❌ Error inserting menu items:', err);
  } finally {
    mongoose.disconnect();
  }
});
