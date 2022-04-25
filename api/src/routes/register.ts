import { Request, Response, Router } from "express";
import { logIn } from "../auth";
import { BadRequest } from "../errors";
import { guest, catchAsync } from "../middleware";
import { User } from "../models";
import { registerSchema, validate } from "../validation";
const router = Router();

router.post(
    "/register",
    guest,
    catchAsync(async (req: Request, res: Response) => {
        // validate the payload
        await validate(registerSchema, req.body);

        const { email, name, password } = req.body;

        const found = await User.exists({ email });

        if (found) {
            // email already taken
            throw new BadRequest("Invalid email");
        }

        const user = await User.create({
            email,
            name,
            password,
        });

        logIn(req, user.id);

        res.json({ message: "register ok" });
    })
);

export default router;
