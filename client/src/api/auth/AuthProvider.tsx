import React, { createContext, useContext, useEffect, useState } from "react";
import { getMe, logout as apiLogout, Me } from "@api/auth/authApi";

type Ctx = {
  user: Me | null;
  loading: boolean;
  refresh: () => Promise<void>;
  signout: () => Promise<void>;
};

const Ctx = createContext<Ctx>({
  user: null,
  loading: true,
  refresh: async () => {},
  signout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Me | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    try {
      setUser(await getMe());
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signout = async () => {
    await apiLogout();
    setUser(null);
    location.replace("/users/login");
  };

  useEffect(() => {
    refresh();
  }, []);

  return <Ctx.Provider value={{ user, loading, refresh, signout }}>{children}</Ctx.Provider>;
};

export const useAuth = () => useContext(Ctx);
