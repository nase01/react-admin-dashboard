import React, { ReactNode, createContext, useContext, useState } from "react";

const ToggleContext = createContext<{
    sidebarExpanded: boolean;
    setSidebarExpanded: React.Dispatch<React.SetStateAction<boolean>>;
    mobileMenuToggle: boolean;
    setMobileMenuToggle: React.Dispatch<React.SetStateAction<boolean>>;
    activeSubMenu: string;
    setActiveSubMenu: React.Dispatch<React.SetStateAction<string>>;
    modalIsOpen: boolean;
    setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    modalDeleteIsOpen: boolean;
    setModalDeleteIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    modalIsLoading: boolean;
    setModalIsLoading: React.Dispatch<React.SetStateAction<boolean>>
} | undefined>(undefined);

export function ToggleProvider({ children }: { children: ReactNode }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [mobileMenuToggle, setMobileMenuToggle] = useState(true);
  const [activeSubMenu, setActiveSubMenu] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
  const [modalIsLoading, setModalIsLoading] = useState(false);

  return (
    <ToggleContext.Provider value={{
      sidebarExpanded, setSidebarExpanded,
      mobileMenuToggle, setMobileMenuToggle,
      activeSubMenu, setActiveSubMenu,
      modalIsOpen, setModalIsOpen,
      modalDeleteIsOpen, setModalDeleteIsOpen,
      modalIsLoading, setModalIsLoading
    }}>
      {children}
    </ToggleContext.Provider>
  );
}

export function useSidebarExpanded() {
  const context = useContext(ToggleContext);
  if (context === undefined) {
    throw new Error("useExpanded must be used within an ToggleProvider");
  }
  return context;
}

export function useMobileMenuToggle() {
  const context = useContext(ToggleContext);
  if (context === undefined) {
    throw new Error("useMobileMenuToggle must be used within an ToggleProvider");
  }
  return context;
}

export function useActiveSubMenu() {
  const context = useContext(ToggleContext);
  if (context === undefined) {
    throw new Error("useActiveSubMenu must be used within an ToggleProvider");
  }
  return context;
}

export function useModalIsOpen() {
  const context = useContext(ToggleContext);
  if (context === undefined) {
    throw new Error("useModalIsOpen must be used within an ToggleProvider");
  }
  return context;
}

export function useModalDeleteIsOpen() {
  const context = useContext(ToggleContext);
  if (context === undefined) {
    throw new Error("useModalIsOpen must be used within an ToggleProvider");
  }
  return context;
}

export function useModalIsLoading() {
  const context = useContext(ToggleContext);
  if (context === undefined) {
    throw new Error("useModalIsLoading must be used within an ToggleProvider");
  }
  return context;
}