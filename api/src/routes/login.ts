import { Request, Response, Router } from "express";
import { logIn, logOut } from "../auth";
import { Unauthorized } from "../errors";
import { auth, catchAsync, guest } from "../middleware";
import { User } from "../models";
import { validate, loginSchema } from "../validation";

const router = Router();

router.post(
    "/login",
    guest,
    catchAsync(async (req: Request, res: Response) => {
        await validate(loginSchema, req.body);

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user || !(await user.matchesPassword(password))) {
            throw new Unauthorized("Incorrect email or password");
        }

        logIn(req, user.id);

        res.json({ message: "Logged in" });
    })
);

router.post(
    "/logout",
    auth,
    catchAsync(async (req: Request, res: Response) => {
        await logOut(req, res);
        res.json({ message: "Logged out" });
    })
);

export default router;
