import { Request, Response } from "express";
import TodoRepository from "../repositories/TodoRepository";

class TodoController {
  async index(req: Request, res: Response) {
    const tasks = await TodoRepository.getAll();

    if (!tasks)
      return res.status(400).json({ error: "Nenhuma tarefa encontrada" });

    return res.status(200).json({ tasks });
  }
}

export default new TodoController();
