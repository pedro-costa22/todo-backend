import { Response, Request } from "express";
import Category from "../../models/Category";
import { where } from "sequelize";

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

  async findById(id: string) {
    const row = await Category.findOne({
      raw: true,
      where: {
        id: id
      }
    });

    return row;
  }

  async delete(id: string) {
    await Category.destroy({
      where: { id: id }
    });
  }

  async update(id: string, newName: string) {
    await Category.update({ name: newName }, { where: { id: id } });

    return this.findById(id);
  }
}

export default new CategoryRepository();
