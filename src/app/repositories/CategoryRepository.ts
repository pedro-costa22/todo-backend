import { Response, Request } from "express";
import Category from "../../models/Category";

class CategoryRepository {
  async findAll() {
    const rows = await Category.findAll({
      raw: true
    });

    return rows;
  }

  async findByName(name: string) {
    const row = await Category.findOne({
      raw: true,
      where: {
        name: name
      }
    });

    return row;
  }

  async create(name: string) {
    const row = await Category.create({
      name
    });

    return row;
  }
}

export default new CategoryRepository();
