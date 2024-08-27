require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://admin:wael01234@localhost:27017/catch-db?authSource=admin';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected to ${MONGO_URI}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
