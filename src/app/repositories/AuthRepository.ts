import User from "../../models/User";
import { INewUser } from "@/types/User";

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
}

export default new AuthRepository();
