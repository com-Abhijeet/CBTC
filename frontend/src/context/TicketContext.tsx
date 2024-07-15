import React, { createContext, useState, useContext, ReactNode } from "react";

interface TicketContextProps {
  tickets: any[];
  setTickets: React.Dispatch<React.SetStateAction<any[]>>;
  clearTickets: () => void;
}

const TicketContext = createContext<TicketContextProps | undefined>(undefined);

export const TicketProvider = ({ children }: { children: ReactNode }) => {
  const [tickets, setTickets] = useState<any[]>([]);

  const clearTickets = () => {
    setTickets([]);
  };

  return (
    <TicketContext.Provider value={{ tickets, setTickets, clearTickets }}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTicket = () => {
  const context = useContext(TicketContext);
  if (context === undefined) {
    throw new Error("useTicket must be used within a TicketProvider");
  }
  return context;
};
