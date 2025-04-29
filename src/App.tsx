
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider, useAuth } from "@/hooks/useAuth";

// Layouts
import MainLayout from "@/layouts/MainLayout";
import AdminLayout from "@/layouts/AdminLayout";
import AuthLayout from "@/layouts/AuthLayout";

// Pages
import HomePage from "@/pages/HomePage";
import SkillTreePage from "@/pages/SkillTreePage";
import MissionPage from "@/pages/MissionPage";
import ProfilePage from "@/pages/ProfilePage";
import LeaderboardPage from "@/pages/LeaderboardPage";
import SettingsPage from "@/pages/SettingsPage";
import LearnPage from "@/pages/LearnPage";

// Admin Pages
import AdminDashboardPage from "@/pages/admin/DashboardPage";
import AdminSkillTracksPage from "@/pages/admin/SkillTracksPage";
import AdminMissionsPage from "@/pages/admin/MissionsPage";
import AdminQuestionBankPage from "@/pages/admin/QuestionBankPage";
import AdminBadgesPage from "@/pages/admin/BadgesPage";
import AdminUsersPage from "@/pages/admin/UsersPage";
import AdminReportsPage from "@/pages/admin/ReportsPage";
import AdminSettingsPage from "@/pages/admin/SettingsPage";
import AdminLearningContent from "@/pages/admin/LearningContentPage";

// Auth Pages
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";

// Other pages
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="flex h-screen w-full items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// Admin route wrapper
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="flex h-screen w-full items-center justify-center">Loading...</div>;
  }

  if (!profile || profile.role !== 'admin') {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// Auth route wrapper (redirects to home if already authenticated)
const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex h-screen w-full items-center justify-center">Loading...</div>;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    {/* Auth routes */}
    <Route element={<AuthLayout />}>
      <Route path="/login" element={<AuthRoute><LoginPage /></AuthRoute>} />
      <Route path="/register" element={<AuthRoute><RegisterPage /></AuthRoute>} />
      <Route path="/forgot-password" element={<AuthRoute><ForgotPasswordPage /></AuthRoute>} />
    </Route>
    
    {/* User routes */}
    <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
      <Route path="/" element={<HomePage />} />
      <Route path="/skill-tree" element={<SkillTreePage />} />
      <Route path="/mission/:id" element={<MissionPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/learn" element={<LearnPage />} />
    </Route>
    
    {/* Admin routes */}
    <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
      <Route index element={<AdminDashboardPage />} />
      <Route path="skill-tracks" element={<AdminSkillTracksPage />} />
      <Route path="missions" element={<AdminMissionsPage />} />
      <Route path="question-bank" element={<AdminQuestionBankPage />} />
      <Route path="badges" element={<AdminBadgesPage />} />
      <Route path="users" element={<AdminUsersPage />} />
      <Route path="reports" element={<AdminReportsPage />} />
      <Route path="settings" element={<AdminSettingsPage />} />
      <Route path="learning-content" element={<AdminLearningContent />} />
    </Route>
    
    {/* Catch-all route */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="questify-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
