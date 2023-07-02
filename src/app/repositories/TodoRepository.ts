import { ITask } from "@/types/Task";
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

  async getByPage(userId: string, limit: number, count: number) {
    const rows = await Tasks.findAll({
      raw: true,
      where: {
        userId: userId
      },
      offset: count,
      limit: limit,
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

  async createTask(body: ITask) {
    const row = await Tasks.create({
      ...body
    });

    return row;
  }
}

export default new TodoRepository();
