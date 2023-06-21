import sequelize from "../../database/dbConnection";
import Tasks from "../../models/Tasks";

class TodoRepository {
  async getAll() {
    const rows = await Tasks.findAll({
      raw: true
    });
    return rows;
  }
}

export default new TodoRepository();
