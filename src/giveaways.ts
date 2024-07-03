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
    console.log(
      `Hola ${user.name}, elige en el menú de opciones lo que quieres hacer`
    );
  } else {
    console.log("El nombre de usuario o la contraseña no son correctas");
    process.exit();
  }
  saveData();
};

export const createGiveaway = (): void => {
  const giveawayData = askUserNewGiveawayData();

  if (giveawayData) {
    const fullGiveawayData: Giveaway = {
      name: giveawayData.giveawayName,
      socialNetwork: giveawayData.giveawaySocialNetwork,
      participants: [],
    };
    programData.giveaways.push(fullGiveawayData);
    saveData();
    console.log("Tus datos han sido añadidos correctamente.");
  } else {
    console.log("Ha habido un error al introducir tus datos.");
  }
};

export const listGiveaways = (): void => {
  const giveaways = programData.giveaways;
  const availableGiveaways = giveaways.length;

  if (!availableGiveaways) {
    console.log("Actualmente no hay sorteos disponibles");
  } else if (availableGiveaways === 1) {
    console.log("Sólo hay un sorteo disponible");
    giveaways.forEach((giveaway, index) =>
      console.log(
        `${index + 1}. Sorteo de un ${giveaway.name} en ${
          giveaway.socialNetwork
        }`
      )
    );
  } else {
    console.log(`Estos son los ${availableGiveaways} sorteos disponibles:`);
    giveaways.forEach((giveaway, index) =>
      console.log(
        `${index + 1}. Sorteo de un ${giveaway.name} en ${
          giveaway.socialNetwork
        }`
      )
    );
  }
};

export const deleteGiveaway = (giveawayPosition: number): void => {
  const giveaways = programData.giveaways;
  const index = giveawayPosition - 1;

  if (!giveaways.at(index)) {
    console.log("El número del sorteo que has elegido no existe");
  } else {
    giveaways.splice(index, 1);
    saveData();
    console.log("El sorteo elegido ha sido eliminado correctamente");
  }
};

export const enterGiveaway = (inscriptionGiveaway: number): void => {
  const giveaway = programData.giveaways.at(inscriptionGiveaway - 1);
  const user = programData.users.find(
    (userData) => userData.email === programData.userEmail
  );

  if (!giveaway) {
    console.log("El número del sorteo que has elegido no existe");
  } else {
    if (!user) {
      console.log("El usuario no ha sido encontrado");
    } else {
      giveaway.participants.push(user);
      saveData();
      console.log(`Has sido añadido al sorteo, ${user.name}`);
    }
  }
};

export const listUserGiveaways = (): void => {
  const giveaways = programData.giveaways;
  const user = programData.users.find(
    (userData) => userData.email === programData.userEmail
  );

  const participatesInGiveaway: Giveaway[] = [];

  giveaways.forEach((giveaway) =>
    giveaway.participants.forEach((participant) => {
      if (participant.name === user?.name) {
        participatesInGiveaway.push(giveaway);
      }
    })
  );

  if (participatesInGiveaway.length === 0) {
    console.log(`No estás inscrito en ningún sorteo`);
  } else if (participatesInGiveaway.length === 1) {
    console.log(`Estás inscrito en el siguiente sorteo:`);
    participatesInGiveaway.forEach((giveaway, index) => {
      console.log(
        `${index + 1}.${giveaway.name} en ${giveaway.socialNetwork} `
      );
    });
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
