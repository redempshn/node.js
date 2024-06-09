import { USER } from "../models/user.js";

const validateEmail = (email) => {
  return email.match(/@gmail\.com$/);
};

const validatePhoneNumber = (phoneNumber) => {
  const phoneNumberRegex = /^\+380\d{9}$/;
  return phoneNumberRegex.test(phoneNumber);
};

const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for USER entity during creation

  const { password, email, phoneNumber } = req.body;

  for (const key in USER) {
    if (USER[key] && !req.body[key]) {
      return res.status(400).json({ error: `Field ${key} is required` });
    }
  }

  if (password.length <= 3) {
    return res
      .status(400)
      .json({ error: "Password length should be at least 3 character" });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  if (!validatePhoneNumber(phoneNumber)) {
    return res
      .status(400)
      .json({ error: "Phone number should be in format '+380*********' " });
  }
  next();
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update

  const { email, password, phoneNumber } = req.body;

  let requiredField = false;
  for (const key in USER) {
    if (key !== "id" && USER[key] && req.body[key]) {
      requiredField = true;
      break;
    }
  }

  if (!requiredField) {
    res.status(400).json({ error: "At least one field required for update" });
  }

  if (password && password.length < 3) {
    return res
      .status(400)
      .json({ error: "Password length should be at least 3 characters" });
  }

  if (email && validateEmail(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  if (phoneNumber && !validatePhoneNumber(phoneNumber)) {
    return res
      .status(400)
      .json({ error: "Phone number should be in format '+380*********' " });
  }
  next();
};

export { createUserValid, updateUserValid };
