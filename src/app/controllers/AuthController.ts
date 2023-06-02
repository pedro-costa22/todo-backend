import { Request, Response } from "express";
import AuthRepository from "../repositories/AuthRepository";

class AuthCotroller {
  async login(req: Request, res: Response) {
    res.status(200);
    res.send("Endpoint Login");
    return;
  }

  async register(req: Request, res: Response) {
    res.status(200);
    res.send("Endpoint Register");
    return;
  }
}

export default new AuthCotroller();
