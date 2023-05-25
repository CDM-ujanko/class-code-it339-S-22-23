import mongoose from "mongoose";
import bcrypt from 'bcrypt';

let port = process.env.MONGODB_PORT,
    host = process.env.MONGODB_HOST,
    db = process.env.MONGODB_DATABASE;

(async () => {
  await mongoose.connect(`mongodb://${host}:${port}/${db}`)
})()

const Schema = mongoose.Schema;

class User {
  #saltRounds = 10;

  constructor() {
    const userSchema = new Schema({
      username: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      },
      dateCreated: {
        type: Date,
        default: Date.now
      }
    });
  }
}

export default new User();
