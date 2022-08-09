const UserRepository = require("../repositories/userRepository");
const userRepository = new UserRepository();

const validator = require("validator");
const encrypt = require("bcryptjs");

class UserService {
  async userFindOrCreate(payload) {
    let err = null;
    let { username, email, password, confirmPassword, role } = payload;
    if (!username || !email || !password || !confirmPassword || !role) {
      err = "Username/Email/Password/Confirm Password/Role does not empty";
      return [err, null];
    }
    if (password !== confirmPassword) {
      err = "Password does not match";
      return [err, null];
    } else {
      const isEmail = await validator.isEmail(email);
      if (!isEmail) {
        err = "Please enter your email";
        return [err, null];
      } else {
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
          const salt = await encrypt.genSalt(10);
          password = await encrypt.hash(password, salt);
          let newPayload = { ...payload, password };
          return await userRepository.findOrCreate(newPayload);
        }
      }
    }
  }
}

module.exports = UserService;
