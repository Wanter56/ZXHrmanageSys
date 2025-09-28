import { apiClient } from "@api/auth/http";

export type Me = { id: string; name: string; roles: string[]; perms: string[] };

export const login = (p: { username: string; password: string }) => apiClient.post("/login", p);
export const logout = () => apiClient.post("/logout");
export const getMe = () => apiClient.get<Me>("/me");
