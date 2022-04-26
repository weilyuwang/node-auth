import Joi from "joi";
import { BCRYPT_MAX_BYTES } from "../config";

const emailConstraint = Joi.string()
    .email()
    .min(8)
    .max(254)
    .lowercase()
    .trim()
    .required();

const passwordConstraint = Joi.string()
    .min(8)
    .max(BCRYPT_MAX_BYTES, "utf8")
    .regex(/^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u)
    .message(
        '"{#label}" must contain one uppercase letter, one lowercase letter, and one digit'
    )
    .required();

export const registerSchema = Joi.object({
    email: emailConstraint,
    name: Joi.string().min(3).max(128).trim().required(),
    password: passwordConstraint,
    passwordConfirmation: Joi.valid(Joi.ref("password")).required(),
});

export const loginSchema = Joi.object({
    email: emailConstraint,
    password: passwordConstraint,
});
