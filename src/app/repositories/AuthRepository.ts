import User from "../../models/User";
import { INewUser } from "@/types/User";
import { IUpdateUser } from "@/types/UpdateUser";

class AuthRepository {
  async findByEmail(email: string) {
    const row = await User.findOne({
      raw: true,
      where: {
        email: email
      }
    });

    return row;
  }

  async findUser(email: string, password: string) {
    const row = await User.findOne({
      raw: true,
      where: {
        email: email,
        password: password
      }
    });

    return row;
  }

  async createUser({ name, email, password }: INewUser) {
    const newUser = await User.create({
      name,
      email,
      password
    });

    return newUser;
  }

  async findById(id: string) {
    const row = await User.findOne({
      raw: true,
      where: {
        id: id
      }
    });

    return row;
  }

  async findPassword(id: string, password: string) {
    const row = await User.findOne({
      raw: true,
      where: {
        id: id,
        password: password
      }
    });

    return row;
  }

  async updateUser(id: string, payload: IUpdateUser) {
    await User.update({ ...payload }, { where: { id: id } });
    return this.findById(id);
  }
}

export default new AuthRepository();
