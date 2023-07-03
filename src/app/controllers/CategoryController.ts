import { Response, Request } from "express";
import CategoryRepository from "../repositories/CategoryRepository";

class CategoryController {
  async show(req: Request, res: Response) {
    const categories = await CategoryRepository.findAll();

    if (categories.length === 0)
      return res.status(400).json({ error: "Nenhuma categoria cadastrada!" });

    return res.json(categories);
  }

  async store(req: Request, res: Response) {
    const { name } = req.body;

    if (!name)
      return res.status(400).json({ error: "Nome não pode ser vazio" });

    const categoryExists = await CategoryRepository.findByName(name);
    if (categoryExists)
      return res.status(400).json({ error: "Categoria já cadastrada" });

    const newCategory = await CategoryRepository.create(name);

    return res.status(201).json({
      message: "Categoria cadastrada com sucesso.",
      newCategory
    });
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { newName } = req.body;

    if (!id) return res.status(400).json({ error: "id não pode ser nulo" });
    if (!newName)
      return res.status(400).json({ error: "O nome não pode ser nulo" });

    const categoryExists = await CategoryRepository.findById(id);

    if (!categoryExists)
      return res
        .status(400)
        .json({ error: "Categoria não existe no sistema." });

    const newCategory = await CategoryRepository.update(id, newName);

    if (newCategory)
      return res.status(200).json({
        message: "Categoria atualizada com sucesso",
        newCategory
      });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) return res.status(400).json({ error: "id não pode ser nulo" });

    const categoryExists = await CategoryRepository.findById(id);

    if (!categoryExists)
      return res
        .status(400)
        .json({ error: "Categoria não existe no sistema." });

    await CategoryRepository.delete(id);

    return res.status(200).json({
      message: "Categoria excluida com sucesso"
    });
  }
}

export default new CategoryController();
