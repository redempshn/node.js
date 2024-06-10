import { userRepository } from "../repositories/userRepository.js";

class UserService {
  // TODO: Implement methods to work with user

  async create(userData) {
    const existingUserEmail = await userRepository.getOne({
      email: userData.email,
    });

    if (existingUserEmail) {
      throw new Error("This email already in use");
    }

    const existingUserPhoneNumber = await userRepository.getOne({
      phoneNumber: userData.phoneNumber,
    });

    if (existingUserPhoneNumber) {
      throw new Error("This phone number already in use");
    }

    return userRepository.create(userData);
  }

  async update(id, userData) {
    const user = await userRepository.getOne({ id });
    if (!user) {
      throw new Error("User not found");
    }

    if (userData.email && userData.email !== user.email) {
      const existingUserByEmail = await userRepository.getOne({
        email: userData.email,
      });
      if (existingUserByEmail) {
        throw new Error("User with this email already exists");
      }
    }

    if (userData.phoneNumber && userData.phoneNumber !== user.phoneNumber) {
      const existingUserByPhone = await userRepository.getOne({
        phoneNumber: userData.phoneNumber,
      });
      if (existingUserByPhone) {
        throw new Error("User with this phone number already exists");
      }
    }

    return userRepository.update(id, userData);
  }

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

const userService = new UserService();

export { userService };
