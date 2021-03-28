import React from "react";
import { BoxInterface } from "../helpers/interfaces";
import { firestore } from "./firebaseConfig";

export async function getDatabaseDocuments() {
  let data: any;
  let documentArray: any = [];
  data = await firestore.collection("box").get();
  data.forEach((doc: any) => {
    const document = {
      id: doc.id,
      name: doc.data().name,
      description: doc.data().description,
      imgUrl: doc.data().imgUrl,
      category: doc.data().imgUrl,
      timestamp: doc.data().timestamp,
    };
    documentArray.push(document);
  });
  return documentArray;
}

type RespStructure =
  | null
  | [string, undefined | Record<string, string | number | Array<string>>];
export async function getDatabaseDocumentById(
  id: string
): Promise<RespStructure> {
  const response = await firestore.collection("box").doc(id).get();
  if (response.exists) {
    console.log("RESPONSE", response.id, response.data());
    return [response.id, response!.data()];
  } else {
    return null;
  }
}

export async function saveDatabaseDocuments(formData: BoxInterface) {
  const response = await firestore.collection("box").add(formData);
  return response;
}

export async function saveFileToBox(id: string, urlArray: Array<String>) {
  const response = await firestore
    .collection("box")
    .doc(id)
    .update({ files: urlArray });
  return response;
}

// async function fetchBoxData() {
//   console.log("FetBoxData function called");
//   setLoading(true);
//   const response = await getDatabaseDocumentById(id);
//   console.log("Response", response);
//   if (response != null || response !== undefined) {
//     const { name, description, files } = response.data();

//     const document = {
//       id: response.id,
//       name: name,
//       description: description,
//       files: files,
//     };
//     console.log(document);
//     console.log(loading);
//   }
//   setBox(document);
//   setLoading(false);
// }

// function fetchUrlList(urlArray) {
//     if (urlArray && urlArray.length > 0) {
//       const finalArray = [];
//       if (files === undefined) {
//         finalArray.push(...urlArray);
//       } else {
//         finalArray.push(...files);
//         finalArray.push(...urlArray);
//       }
//       const response = saveFileToBox(id, finalArray);
//       if (response) {
//         console.log("Files adde to box");
//         setAddNewFileState(true);
//       }
//     }
//   }

// <DropZone sendUrlListToParent={fetchUrlList} />
