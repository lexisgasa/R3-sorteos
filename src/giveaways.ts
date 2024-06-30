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
};
