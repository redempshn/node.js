import { FIGHTER } from "../models/fighter.js";

const validatePower = (power) => {
  if (typeof power !== "number") {
    return;
  } else {
    return power >= 1 && power <= 100;
  }
};

const validateDefense = (defense) => {
  if (typeof defense !== "number") {
    return;
  } else {
    return defense >= 1 && defense <= 10;
  }
};

const validateHealth = (health) => {
  if (health === undefined) {
    return (health = 85);
  }

  if (typeof health !== "number") {
    return false;
  }

  return health >= 80 && health <= 120;
};

const createFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during creation

  const { power, defense, health } = req.body;

  for (const key in FIGHTER) {
    if (FIGHTER[key] && !req.body[key]) {
      return res.status(400).json({ error: `Field ${key} is required` });
    }
  }

  if (!validatePower(power)) {
    return res.status(400).json({ error: "Wrond value for power field" });
  }

  if (!validateDefense(defense)) {
    return res.status(400).json({ error: "Wrond value for defense field" });
  }

  if (!validateHealth(health)) {
    return res
      .status(400)
      .json({ error: "Health range should be from 80 to 120" });
  }

  next();
};

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during update

  let requiredField = false;
  for (const key in FIGHTER) {
    if (key !== "id" && FIGHTER[key] && req.body[key]) {
      requiredField = true;
      break;
    }
  }

  if (!requiredField) {
    res.status(400).json({ error: "At least one field required for update" });
  }

  if (power && !validatePower(power)) {
    return res.status(400).json({ error: "Wrond value for power field" });
  }

  if (defense && !validateDefense(defense)) {
    return res.status(400).json({ error: "Wrond value for defense field" });
  }

  if (health && !validateHealth(health)) {
    return res
      .status(400)
      .json({ error: "Health range should be from 80 to 120" });
  }

  next();
};

export { createFighterValid, updateFighterValid };
