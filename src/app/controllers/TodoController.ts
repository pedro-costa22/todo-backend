import { Request, Response } from "express";
import TodoRepository from "../repositories/TodoRepository";
import AuthRepository from "../repositories/AuthRepository";
import CategoryRepository from "../repositories/CategoryRepository";

class TodoController {
  async show(req: Request, res: Response) {
    const { user_id, limit = 10, page = 1 } = req.query;

    if (!user_id)
      return res.status(404).json({
        error: "user_id não poder ser null"
      });

    const listTasks = await TodoRepository.getAll(user_id as string);
    if (listTasks.length === 0)
      return res.status(400).json({
        error: "Não foram encontradas tarefas para esse usuário"
      });

    const totalPages = Math.ceil(listTasks.length / Number(limit));
    const count = Number(page) * Number(limit) - Number(limit);

    const tasks = await TodoRepository.getByPage(
      user_id as string,
      Number(limit),
      count
    );

    if (tasks.length === 0)
      return res.status(404).json({
        error: "Não foram encontradas tarefas nessa página"
      });

    return res.status(200).json({
      message: "Tarefas encontradas",
      tasks,
      total_items: tasks.length,
      total_pages: totalPages,
      current_pages: page,
      next_page: totalPages !== Number(page) ? Number(page) + 1 : null
    });
  }

  async store(req: Request, res: Response) {
    const body = {
      name: req.body.name,
      description: req.body.description,
      status: "created",
      userId: req.body.userId,
      categoryId: req.body.categoryId
    };

    for (const [key, value] of Object.entries(body)) {
      if (!value) {
        return res.status(400).json({
          error: `${key} não pode ser null!`
        });
      }
    }

    const userExists = await AuthRepository.findById(body.userId);
    const categoryExists = await CategoryRepository.findById(body.categoryId);
    if (!userExists)
      return res.status(404).json({ error: "Usuário não encontrado!" });
    if (!categoryExists)
      return res.status(404).json({ error: "Categoria não encontrada!" });

    const newTask = await TodoRepository.createTask(body);
    return res.status(201).json({
      message: "Tarefa criada com sucesso",
      newTask
    });
  }
}

export default new TodoController();
