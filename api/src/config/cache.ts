import { RedisOptions } from "ioredis";

const {
    REDIS_PORT = 6379,
    REDIS_HOST = "localhost",
    REDIST_PASSWORD = "secret",
} = process.env;

export const REDIS_OPTIONS: RedisOptions = {
    port: +REDIS_PORT, // The Unary plus (+) operator converts all string representations of numbers, boolean values(true and false), and null to numbers.
    host: REDIS_HOST,
    password: REDIST_PASSWORD,
};
