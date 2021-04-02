import 'dotenv/config';
import mongoose from 'mongoose';
import 'colorts/lib/string';
import users from './data/users';
import products from './data/products';
import User from './models/UserModel';
import Product from './models/ProductModel';
import Order from './models/OrderModel';
import { Review } from './models/ReviewModel';
import connectDB from './config/database';

('ADMIN MIDDLEWARE');
connectDB();

const importData = async () => {
  try {
    await Order.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});
    await Review.deleteMany({});

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return {
        ...product,
        reviews: [],
        user: adminUser,
      };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});
    await Review.deleteMany({});

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
