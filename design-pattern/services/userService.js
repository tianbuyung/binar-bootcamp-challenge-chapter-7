const encrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const UserRepository = require("../repositories/userRepository");
const userRepository = new UserRepository();

const secretKey = process.env.JWT_SECRET_KEY || "Secret_Key";

class UserService {
  async #encrypt(password, saltRounds) {
    const salt = await encrypt.genSalt(saltRounds);
    return await encrypt.hash(password, salt);
  }
  async #checkPassword(userPassword, dbPassword) {
    return await encrypt.compare(userPassword, dbPassword);
  }
  async userFindOrCreate(payload) {
    let err = null;
    let { password } = payload;
    let isStrongPassword = await validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
      pointsPerUnique: 1,
      pointsPerRepeat: 0.5,
      pointsForContainingLower: 10,
      pointsForContainingUpper: 10,
      pointsForContainingNumber: 10,
      pointsForContainingSymbol: 10,
    });
    if (!isStrongPassword) {
      err =
        "Password is weak: must contain minimum 1 letter, 1 number, 1 symbol, 1 lowercase, 1 uppercase and lenght more than 8 characters";
      return [err, null];
    } else {
      password = await this.#encrypt(password, 3);
      let newPayload = { ...payload, password };
      return await userRepository.findOrCreate(newPayload);
    }
  }
  async userRegister(payload) {
    let err = null;
    let { username, email, password, confirmPassword, role } = payload;
    if (!username || !email || !password || !confirmPassword || !role) {
      err = "Username/Email/Password/Confirm Password/Role does not empty";
      return [err, null];
    }
    const isEmail = await validator.isEmail(email);
    if (!isEmail) {
      err = "Please enter your email";
      return [err, null];
    } else if (password !== confirmPassword) {
      err = "Password does not match";
      return [err, null];
    } else {
      return await this.userFindOrCreate(payload);
    }
  }
  async userLogin(payload) {
    let err = null;
    const { username, password } = payload;
    if (!username || !password) {
      err = "Password/Username does not empty";
      return [err, null];
    }
    const options = {
      attributes: ["userId", "username", "email", "password", "role"],
      where: { username: username },
    };
    let [error, isUserFound] = await userRepository.findOne(options);
    if (error) {
      error = "User is not found";
      return [error, null];
    } else if (isUserFound) {
      const dbPassword = isUserFound.password;
      const isTruePassword = await this.#checkPassword(password, dbPassword);
      if (!isTruePassword) {
        err = "Password does not match";
        return [err, null];
      } else {
        try {
          let token = jwt.sign(
            {
              userId: isUserFound.userId,
              username: isUserFound.username,
              email: isUserFound.email,
              role: isUserFound.role,
            },
            secretKey,
            { expiresIn: 60 }
          );
          return [err, token];
        } catch (error) {
          return [error, null];
        }
      }
    }
  }
  async userFindByPK(payload) {
    return await userRepository.findByPk(payload);
  }
  async usersFindAndCountAll(query) {
    const limit = Number(query.limit) || 5;
    const page = Number(query.page) || 1;
    const offset = (page - 1) * limit;
    const options = {
      order: ["id"],
      limit,
      offset,
      attributes: [
        "userId",
        "username",
        "email",
        "role",
        "createdAt",
        "updatedAt",
      ],
    };
    const users = await userRepository.findAndCountAll(options);
    return [users, limit, page];
  }
}

module.exports = UserService;
