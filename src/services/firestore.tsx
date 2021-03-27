import React from "react";
import { BoxInterface } from "../helpers/interfaces";
import { firestore } from "./firebaseConfig";

export async function getDatabaseDocuments() {
  console.log("Fetching records");
  let data: any;
  let documentArray: any = [];
  data = await firestore.collection("box").get();
  console.log("Ftetched Data");
  data.forEach((doc: any) => {
    console.log(doc.id, "=>", doc.data().name);
    const document = {
      id: doc.id,
      name: doc.data().name,
      description: doc.data().description,
    };
    documentArray.push(document);
  });
  return documentArray;
}

export async function saveDatabaseDocuments(formData: BoxInterface) {
  console.log("Saving Data");
  const response = await firestore.collection("box").add(formData);
  console.log("Response Received", response);
  return response;
}
