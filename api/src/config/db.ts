import { ConnectOptions } from "mongoose";

const {
    MONGO_USERNAME = "admin",
    MONGO_PASSWORD = "secret",
    MONGO_HOST = "localhost",
    MONGO_PORT = 27017,
    MONGO_DATABASE = "auth",
} = process.env;

export const MONGO_URI = `mongodb://${MONGO_USERNAME}:${encodeURIComponent(
    MONGO_PASSWORD
)}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`;

/* Breaking changes in mongoose 6:
  useNewUrlParser, useUnifiedTopology, useFindAndModify, 
  and useCreateIndex are no longer supported options. 
  Mongoose 6 always behaves as if useNewUrlParser, useUnifiedTopology, 
  and useCreateIndex are true, and useFindAndModify is false.
*/
export const MONGO_OPTIONS: ConnectOptions = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    // serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    // family: 4, // Use IPv4, skip trying IPv6
};
