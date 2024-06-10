import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  // TODO: Implement methods to work with fighters

  async create(fighterData) {
    const existingFighterName = await fighterRepository.getOne({
      name: fighterData.name,
    });

    if (existingFighterName) {
      throw new Error("This name already exists");
    }

    return fighterRepository.create(fighterData);
  }

  async update(id, fighterData) {
    const fighter = fighterRepository.getOne({ id });
    if (!fighter) {
      throw new Error("Fighter not found");
    }

    if (fighterData.name) {
      const existingFighterName = await fighterRepository.getOne({
        name: fighterData.name,
      });

      if (existingFighterName) {
        throw new Error("This name already exists");
      }
    }

    return fighterRepository.update(id, fighterData);
  }
}

const fighterService = new FighterService();

export { fighterService };
