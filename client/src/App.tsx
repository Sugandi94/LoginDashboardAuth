import { Switch, Route, Router as WouterRouter } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { ProtectedRoute } from "./lib/protected-route";
import DashboardPage from "@/pages/dashboard-page";
import AuthPage from "@/pages/auth-page";
import { AuthProvider } from "./hooks/use-auth";

function AppRoutes() {
  return (
    <Switch>
      <ProtectedRoute path="/" component={DashboardPage} />
      <Route path="/auth">
        <AuthPage />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <AuthProvider>
      <WouterRouter>
        <TooltipProvider>
          <Toaster />
          <AppRoutes />
        </TooltipProvider>
      </WouterRouter>
    </AuthProvider>
  );
}

export default App;
