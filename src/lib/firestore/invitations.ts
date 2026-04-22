import { Invitation } from "@/types/invitation";
import { db } from "@/lib/init/firebase/client";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  setDoc,
} from "firebase/firestore";

export async function createInvitation(data: Invitation, id: string) {
  if (id) {
    const docRef = doc(db, "forms", id);
    await setDoc(docRef, {
      ...data,
      createdAt: serverTimestamp(),
    });
    return id;
  } else {
    const ref = collection(db, "forms");
    const doc = await addDoc(ref, {
      ...data,
      createdAt: serverTimestamp(),
    });
    return doc.id;
  }
}
