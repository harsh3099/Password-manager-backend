import React, { createContext, useContext } from "react";

interface NoteContextType {
  // Define the types for your context values here
}

const NoteContext = createContext<NoteContextType | undefined>(undefined);

export const useNoteContext = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error("useNoteContext must be used within a NoteProvider");
  }
  return context;
};

export default NoteContext;
