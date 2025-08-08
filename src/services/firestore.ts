import { collection, doc, getDoc, getDocs, updateDoc, setDoc, query, where, orderBy, Timestamp, addDoc, deleteDoc } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";

// News Notes
export const fetchNotes = async () => {
  try {
    const notesRef = collection(db, "notes");
    const notesSnapshot = await getDocs(query(notesRef, orderBy("date", "desc")));
    
    return notesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
};

export const fetchNoteById = async (id: string) => {
  try {
    const noteDoc = await getDoc(doc(db, "notes", id));
    if (noteDoc.exists()) {
      return { id: noteDoc.id, ...noteDoc.data() };
    }
    throw new Error("Nota no encontrada");
  } catch (error) {
    console.error("Error fetching note:", error);
    throw error;
  }
};

export const updateNote = async (id: string, data: any) => {
  try {
    // Solo actualizar campos específicos, no agregar timestamps automáticamente
    const updateData = {
      title: data.title,
      summary: data.summary,
      content: data.content,
      image: data.image,
      author: data.author,
      date: data.date, // Mantener como string
      updatedAt: Timestamp.now()
    };
    
    await updateDoc(doc(db, "notes", id), updateData);
    return { id, ...data };
  } catch (error) {
    console.error("Error updating note:", error);
    throw error;
  }
};

export const createNote = async (data: any) => {
  try {
    // Crear datos con timestamp solo para metadatos
    const noteData = {
      title: data.title,
      summary: data.summary,
      content: data.content,
      image: data.image,
      author: data.author,
      date: data.date, // Mantener como string
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };

    // 1. Crear el documento
    const newNoteRef = await addDoc(collection(db, "notes"), noteData);

    // 2. Devolver los datos con el ID
    return {
      id: newNoteRef.id,
      ...data // Retornar los datos originales (sin timestamps)
    };
  } catch (error) {
    console.error("Error creating note:", error);
    throw error;
  }
};

export const deleteNote = async (id: string) => {
  try {
    await deleteDoc(doc(db, "notes", id));
    return id;
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
};

// News Videos
export const fetchVideos = async () => {
  try {
    const videosRef = collection(db, "videos");
    const videosSnapshot = await getDocs(query(videosRef, orderBy("date", "desc")));
    
    return videosSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error;
  }
};

export const updateVideo = async (id: string, data: any) => {
  try {
    // Make sure to handle conversion from videoId to videoUrl if needed
    const dataToSave = {
      ...data,
      updatedAt: Timestamp.now()
    };
    
    await setDoc(doc(db, "videos", id), dataToSave, { merge: true });
    return { id, ...dataToSave };
  } catch (error) {
    console.error("Error updating video:", error);
    throw error;
  }
};

export const createVideo = async (data: any) => {
  try {
    const now = Timestamp.now();

    // 1. Crear el documento con addDoc para que Firestore genere el ID
    const newVideoRef = await addDoc(collection(db, "videos"), {
      ...data,
      date: now,
      updatedAt: now
    });

    // 2. Actualizar el mismo documento agregando su ID
    await updateDoc(newVideoRef, {
      id: newVideoRef.id
    });

    // 3. Devolver datos completos incluyendo ID y conversion de Timestamps a Date
    return {
      id: newVideoRef.id,
      ...data,
      date: now.toDate(),
      updatedAt: now.toDate()
    };
  } catch (error) {
    console.error("Error creating video:", error);
    throw error;
  }
};

export const deleteVideo = async (id: string) => {
  try {
    await deleteDoc(doc(db, "videos", id));
    return id;
  } catch (error) {
    console.error("Error deleting video:", error);
    throw error;
  }
};

// Teams and Standings
export const fetchTeamStandings = async () => {
  try {
    const standingsRef = collection(db, "standings");
    const standingsSnapshot = await getDocs(standingsRef);
    
    return standingsSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id, // Ensure ID is always taken from Firestore document
        ...data,
        // Ensure isHomeTeam is always a boolean
        isHomeTeam: data.isHomeTeam === undefined ? false : Boolean(data.isHomeTeam)
      };
    });
  } catch (error) {
    console.error("Error fetching standings:", error);
    throw error;
  }
};

export const updateStanding = async (id: string, data: any) => {
  try {
    console.log("updateStanding called with id:", id);
    console.log("updateStanding data before processing:", data);
    
    if (!id || id.trim() === "") {
      throw new Error("Invalid document ID provided for update");
    }
    
    // Ensure isHomeTeam is always a boolean before saving
    const dataToSave = {
      ...data,
      isHomeTeam: data.isHomeTeam === undefined ? false : Boolean(data.isHomeTeam),
      updatedAt: Timestamp.now()
    };

    // Remove id from data to prevent it being saved as a field
    if (dataToSave.id) {
      delete dataToSave.id;
    }
    
    console.log("Final data to save in update:", dataToSave);
    
    // Get a reference to the document and update it
    const standingRef = doc(db, "standings", id);
    await setDoc(standingRef, dataToSave, { merge: true });
    
    return { id, ...dataToSave };
  } catch (error) {
    console.error("Error updating standing:", error);
    throw error;
  }
};

export const createStanding = async (data: any) => {
  try {
    console.log("createStanding called with data:", data);

    // Limpiar los datos: eliminar `id` y asegurar `isHomeTeam` como booleano
    const { id, ...cleanData } = data;

    const dataToSave = {
      ...cleanData,
      isHomeTeam: cleanData.isHomeTeam === undefined ? false : Boolean(cleanData.isHomeTeam),
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    console.log("Final data to save in create:", dataToSave);

    // Crear el nuevo documento en la colección 'standings'
    const newStandingRef = await addDoc(collection(db, "standings"), dataToSave);

    console.log("Created new standing with ID:", newStandingRef.id);

    // Devolver el documento con el ID generado por Firestore
    return { id: newStandingRef.id, ...dataToSave };
  } catch (error) {
    console.error("Error creating standing:", error);
    throw error;
  }
};

export const deleteStanding = async (id: string) => {
  try {
    if (!id || id.trim() === "") {
      throw new Error("Invalid document ID provided for deletion");
    }
    
    console.log("Deleting standing with ID:", id);
    await deleteDoc(doc(db, "standings", id));
    console.log("Successfully deleted standing with ID:", id);
    return id;
  } catch (error) {
    console.error("Error deleting standing:", error);
    throw error;
  }
};

// Matches and Results
export const fetchMatches = async () => {
  try {
    const matchesRef = collection(db, "matches");
    const matchesSnapshot = await getDocs(query(matchesRef, orderBy("date", "desc")));
    
    return matchesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching matches:", error);
    throw error;
  }
};

export const updateMatch = async (id: string, data: any) => {
  try {
    await setDoc(doc(db, "matches", id), {
      ...data,
      updatedAt: Timestamp.now()
    });
    return { id, ...data };
  } catch (error) {
    console.error("Error updating match:", error);
    throw error;
  }
};

export const createMatch = async (data: any) => {
  try {
    // Excluir campo `id` si existe en `data`
    const { id, ...dataWithoutId } = data;

    const newMatchRef = await addDoc(collection(db, "matches"), {
      ...dataWithoutId,
      updatedAt: Timestamp.now()
    });

    return { id: newMatchRef.id, ...dataWithoutId };
  } catch (error) {
    console.error("Error creating match:", error);
    throw error;
  }
};

export const deleteMatch = async (id: string) => {
  try {
    await deleteDoc(doc(db, "matches", id));
    return id;
  } catch (error) {
    console.error("Error deleting match:", error);
    throw error;
  }
};
