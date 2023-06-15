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

    return res.status(200).json({
      message: "Categoria cadastrada com sucesso.",
      newCategory
    });
  }

  // async update(req: Request, res: Response) {

  // };

  // async delete(req: Request, res: Response) {

  // }
}

export default new CategoryController();
