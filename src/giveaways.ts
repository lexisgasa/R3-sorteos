import { askUser } from "./askUser.js";
import { programData, saveData } from "./storage.js";

import { Giveaway } from "./types.js";
import { askUserNewGiveawayData } from "./ui.js";

export const loginUser = (email: string, password: string): void => {
  const user = programData.users.find(
    (userData) => userData.email === email && userData.password === password
  );

  if (user) {
    programData.userEmail = user.email;
    programData.isAdmin = user.isAdmin;
  } else {
    process.exit();
  }
  saveData();
};

export const createGiveaway = (): void => {
  const giveawayData = askUserNewGiveawayData();

  if (giveawayData) {
    const fullGiveawayData = {
      name: giveawayData.giveawayName,
      socialNetwork: giveawayData.giveawaySocialNetwork,
      participants: [],
    };
    programData.giveaways.push(fullGiveawayData);
    saveData();
    console.log(`Tus datos han sido añadidos correctamente.`);
  } else {
    console.log("Ha habido un error al introducir tus datos.");
  }
};

export const listGiveaways = (): void => {
  const giveaway = programData.giveaways;
  const availableGiveaways = giveaway.length;

  if (!giveaway) {
    console.log(`Actualmente no hay sorteos disponibles`);
  } else {
    console.log(
      `Estos son los sorteos ${availableGiveaways} sorteos disponibles:`
    );
    giveaway.forEach((giveaway, index) =>
      console.log(
        `${index + 1}. Sorteo de un ${giveaway.name} en ${
          giveaway.socialNetwork
        }`
      )
    );
  }
};
