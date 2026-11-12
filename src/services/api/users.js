import { requireSupabase, supabase } from "../supabase";

export const createUser = async ({
  email,
  password,
  firstName,
  lastName,
  phone,
  address,
  role,
}) => {
  const client = requireSupabase();
  const emailRedirectTo = import.meta.env.VITE_SITE_URL || window.location.origin;
  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: emailRedirectTo.replace(/\/$/, ""),
      data: {
        firstName,
        lastName,
        phone,
        address,
        role: role || "USER",
      },
    },
  });

  if (error) {
    if (
      error.code === "over_email_send_rate_limit" ||
      error.message?.toLowerCase().includes("email rate limit exceeded")
    ) {
      throw new Error(
        "Supabase has reached its built-in email limit (2 emails per hour). Wait for it to reset before trying again. For regular sign-ups, configure custom SMTP in Supabase under Authentication → Emails → SMTP Settings."
      );
    }
    throw new Error(error.message);
  }
  return {
    ...data,
    accessToken: data.session?.access_token || null,
    message: data.session
      ? "Registration successful. You are now signed in."
      : "Registration successful. Check your email to confirm your account, then log in.",
  };
};

export const loginUser = async ({ email, password }) => {
  const client = requireSupabase();
  const { data, error } = await client.auth.signInWithPassword({ email, password });

  if (error) throw new Error(error.message);
  return {
    ...data,
    accessToken: data.session?.access_token || null,
    message: "Login successful!",
  };
};

export const logoutUser = async () => {
  const { error } = supabase ? await supabase.auth.signOut() : {};
  localStorage.removeItem("auth-token");
  if (error) throw new Error(error.message);
};
