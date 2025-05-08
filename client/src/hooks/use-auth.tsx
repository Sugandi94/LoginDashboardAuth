import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { insertUserSchema, User, loginUserSchema } from "@shared/schema";
import { getQueryFn, apiRequest, queryClient } from "../lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

type AuthContextType = {
  user: Omit<User, "password"> | null;
  isLoading: boolean;
  error: Error | null;
  loginMutation: UseMutationResult<Omit<User, "password">, Error, LoginData>;
  logoutMutation: UseMutationResult<void, Error, void>;
  registerMutation: UseMutationResult<Omit<User, "password">, Error, RegisterData>;
};

type LoginData = z.infer<typeof loginUserSchema>;
type RegisterData = z.infer<typeof insertUserSchema>;

export const AuthContext = createContext<AuthContextType | null>(null);

// Create a safe default value for the context
const createDefaultContext = (): AuthContextType => ({
  user: null,
  isLoading: false,
  error: null,
  loginMutation: {} as UseMutationResult<Omit<User, "password">, Error, LoginData>,
  registerMutation: {} as UseMutationResult<Omit<User, "password">, Error, RegisterData>,
  logoutMutation: {} as UseMutationResult<void, Error, void>,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  // Set initial state to prevent errors during initialization
  const [authState, setAuthState] = useState<AuthContextType>(createDefaultContext());
  
  const {
    data: user,
    error,
    isLoading,
  } = useQuery<Omit<User, "password">, Error>({
    queryKey: ["/api/user"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginData) => {
      const res = await apiRequest("POST", "/api/login", credentials);
      return await res.json();
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["/api/user"], user);
      toast({
        title: "Welcome back!",
        description: `You are now logged in as ${user.firstName} ${user.lastName}`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (credentials: RegisterData) => {
      const res = await apiRequest("POST", "/api/register", credentials);
      return await res.json();
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["/api/user"], user);
      toast({
        title: "Registration successful!",
        description: `Welcome ${user.firstName} ${user.lastName}!`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/logout");
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/user"], null);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Logout failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Update context state after hooks are fully initialized
  useEffect(() => {
    setAuthState({
      user: user ?? null,
      isLoading,
      error,
      loginMutation,
      logoutMutation,
      registerMutation,
    });
  }, [user, isLoading, error, loginMutation, logoutMutation, registerMutation]);

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
