
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { Chrome } from "lucide-react";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signInWithGoogle = async () => {
    "use server";

    const supabase = createClient();
    const origin = headers().get("origin");

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate with Google");
    }

    return redirect(data.url);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
            <Logo className="justify-center"/>
          <h1 className="text-3xl font-bold font-headline">Login</h1>
          <p className="text-muted-foreground">Sign in to your account using Google</p>
        </div>
        <form className="space-y-4">
          <Button formAction={signInWithGoogle} className="w-full">
            <Chrome className="mr-2 h-4 w-4" />
            Sign In with Google
          </Button>
        </form>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </div>
    </div>
  );
}
