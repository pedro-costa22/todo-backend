import { Request, Response } from "express";
import AuthRepository from "../repositories/AuthRepository";

class AuthCotroller {
  async show(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email) return res.status(400).json({ error: "e-mail is required" });

    const findEmail = await AuthRepository.findByEmail(email);

    if (!findEmail) {
      return res
        .status(400)
        .json({ error: "Usuário não cadastrado no sistema" });
    }

    const user = await AuthRepository.findUser(email, password);

    if (user) {
      return res.status(200).json({
        message: "Usuário autenticado com sucesso!",
        user
      });
    }

    return res.status(400).json({ error: "Dados inválidos" });
  }

  async store(req: Request, res: Response) {
    const { name, email, password } = req.body;

    if (!name) return res.status(400).json({ error: "name is required" });
    if (!email) return res.status(400).json({ error: "e-mail is required" });
    if (!password)
      return res.status(400).json({ error: "password is required" });

    const emailExists = await AuthRepository.findByEmail(email);
    if (emailExists)
      return res.status(400).json({ error: "email já cadastrado no sistema" });

    const user = {
      name,
      email,
      password
    };

    const newUser = await AuthRepository.createUser(user);
    if (newUser) {
      return res.status(200).json({
        message: "Usuário cadastrado com sucesso!",
        user
      });
    }

    return res.status(400).json({ error: "Dados inválidos" });
  }
}

export default new AuthCotroller();
