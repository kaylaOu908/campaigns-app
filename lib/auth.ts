// Auth stub 
// in a real app, this would come from NextAuth or Supabase session cookies.

export type User = {
  id: string;
  email: string;
  role: "viewer" | "admin";
};

export async function getCurrentUser(): Promise<User | null> {
  // this should be replace with real session lookup
  return {
    id: "user_001",
    email: "kayla@example.com",
    role: "admin",
  };
    // return null;
}