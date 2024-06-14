import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import dotenv from "dotenv";
import { serverConfig } from "../config";

dotenv.config();
const projectId = serverConfig.serviceAccount.projectId;
const clientEmail = serverConfig.serviceAccount.clientEmail;
const privateKey = serverConfig.serviceAccount.privateKey;

initializeApp({
  credential: cert({ projectId, clientEmail, privateKey }),
});

const db = getFirestore();

const dogBreeds = [
  "Labrador Retriever",
  "German Shepherd",
  "Golden Retriever",
  "Bulldog",
  "Poodle",
  // Ajoute autant de races que nécessaire
];

async function addDogBreeds() {
  const dogBreedsCollection = db.collection("dogBreeds");

  for (const breed of dogBreeds) {
    await dogBreedsCollection.add({
      name: breed,
    });
  }
}

addDogBreeds()
  .then(() => console.log("Races de chiens ajoutées avec succès"))
  .catch((error) =>
    console.error("Erreur lors de l'ajout des races de chiens: ", error)
  );
