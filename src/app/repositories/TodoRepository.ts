import { ITask, ITaskEdit } from "@/types/Task";
import Tasks from "../../models/Tasks";
import Category from "../../models/Category";

class TodoRepository {
  async getAll(userId: string) {
    const rows = await Tasks.findAll({
      raw: true,
      where: {
        userId: userId
      },
      include: [
        {
          model: Category,
          required: true,
          attributes: ["name"]
        }
      ],
      attributes: [
        "name",
        "description",
        "status",
        "createdAt",
        "category.name",
        "id"
      ]
    });

    return rows;
  }

  async getByPage(
    userId: string,
    limit: number,
    count: number,
    order?: string
  ) {
    const rows = await Tasks.findAll({
      raw: true,
      where: {
        userId: userId
      },
      offset: count,
      limit: limit,
      order: [["createdAt", order || "DESC"]],
      include: [
        {
          model: Category,
          required: true,
          attributes: ["name"]
        }
      ],
      attributes: [
        "name",
        "description",
        "status",
        "createdAt",
        "category.name",
        "id"
      ]
    });

    return rows;
  }

  async getById(id: string) {
    const row = await Tasks.findOne({
      raw: true,
      where: {
        id: id
      }
    });

    return row;
  }

  async createTask(body: ITask) {
    const row = await Tasks.create({
      ...body
    });

    return row;
  }

  async delete(id: string) {
    await Tasks.destroy({
      where: { id: id }
    });
  }

  async update(id: string, body: ITaskEdit) {
    await Tasks.update({ ...body }, { where: { id: id } });
    return this.getById(id);
  }
}

export default new TodoRepository();
