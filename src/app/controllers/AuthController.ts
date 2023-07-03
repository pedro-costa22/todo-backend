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

    if (!name) return res.status(404).json({ error: "name is required" });
    if (!email) return res.status(404).json({ error: "e-mail is required" });
    if (!password)
      return res.status(404).json({ error: "password is required" });

    const emailExists = await AuthRepository.findByEmail(email);
    if (emailExists)
      return res.status(404).json({ error: "email já cadastrado no sistema" });

    const user = {
      name,
      email,
      password
    };

    const newUser = await AuthRepository.createUser(user);
    if (newUser) {
      return res.status(201).json({
        message: "Usuário cadastrado com sucesso!",
        user
      });
    }

    return res.status(400).json({ error: "Dados inválidos" });
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, newEmail, currentPassword, newPassword, profile } = req.body;

    if (!id) return res.status(400).json({ error: "Id não pode ser nulo" });

    const userExists = await AuthRepository.findById(id);

    if (!userExists)
      return res.status(400).json({
        Error: "Usuário não encontrado"
      });

    const defaultPayload = {
      name: name,
      email: newEmail,
      password: newPassword,
      profile: profile
    };

    let dinamycPayload = {};
    for (const [key, value] of Object.entries(defaultPayload)) {
      if (value) {
        dinamycPayload = {
          ...dinamycPayload,
          [key]: value
        };
      }
    }

    if (!newPassword) {
      if (Object.keys(dinamycPayload).length === 0) {
        return res.status(400).json({
          message: "Nenhum dado informado"
        });
      }

      const update = await AuthRepository.updateUser(id, dinamycPayload);
      return res.status(200).json({
        message: "Informações atualizadas com sucesso",
        update
      });
    }

    if (!currentPassword)
      return res.status(400).json({ error: "A senha atual não pode ser nula" });

    const checkPassword = await AuthRepository.findPassword(
      id,
      currentPassword
    );

    if (!checkPassword)
      return res.status(400).json({
        error: "A senha atual está incorreta"
      });

    const update = await AuthRepository.updateUser(id, dinamycPayload);
    return res.status(200).json({
      message: "Informações atualizadas com sucesso",
      update
    });
  }
}

export default new AuthCotroller();
