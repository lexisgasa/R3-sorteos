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

export const deleteGiveaway = (giveAwayPosition: number): void => {
  const giveaway = programData.giveaways;

  if (!giveaway.at(giveAwayPosition)) {
    console.log(`El número del sorteo que has elegido no existe`);
  } else {
    giveaway.splice(giveAwayPosition, 1);
    saveData();
    console.log(`El sorteo elegido ha sido eliminado correctamente`);
  }
};

export const enterGiveaway = (inscriptionNumber: number): void => {
  const giveaway = programData.giveaways.at(inscriptionNumber - 1);
  const user = programData.users.find(
    (userData) => userData.email === programData.userEmail
  );

  if (!giveaway) {
    console.log(`El número del sorteo que has elegido no existe`);
  } else {
    if (!user) {
      console.log(`El usuario no ha sido encontrado`);
    } else {
      giveaway.participants.push(user);
      saveData();
      console.log(`Has sido añadido al sorteo, ${user?.name}`);
    }
  }
};

export const listUserGiveaways = (): void => {
  const giveaway = programData.giveaways;
  const user = programData.users.find(
    (userData) => userData.email === programData.userEmail
  );

  const participatesInGiveaway: Giveaway[] = [];

  giveaway.forEach((giveaway) =>
    giveaway.participants.forEach((participant) => {
      if (participant.name === user?.name) {
        participatesInGiveaway.push(giveaway);
      }
    })
  );

  if (participatesInGiveaway.length === 0) {
    console.log(`No estás inscrito en ningún sorteo`);
  } else {
    console.log(
      `Estás inscrito en los siguientes ${participatesInGiveaway.length} sorteos:`
    );
    participatesInGiveaway.forEach((giveaway, index) => {
      console.log(
        `${index + 1}.${giveaway.name} en ${giveaway.socialNetwork} `
      );
    });
  }
};
