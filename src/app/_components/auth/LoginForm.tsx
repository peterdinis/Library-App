"use client";

import { Book, Lock, Mail, Eye, EyeOff, Loader2 } from "lucide-react";
import { useState, type FC, FormEvent } from "react";
import { Button } from "~/components/ui/button";
import { useToast } from "~/hooks/use-toast";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

const LoginForm: FC = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const loginUser = api.user.loginUser.useMutation({
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = await loginUser.mutateAsync({ email, password });

    localStorage.setItem("userEmail", email)
    if (!result.success) {
      setError(result.error);
    }
    toast({
      title: "Prihlásenie bolo úspešné",
      duration: 2000,
      className: "bg-green-800 text-white font-bold text-xl",
    });

    router.push("/profile")
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6 dark:bg-zinc-900">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-lg dark:bg-zinc-800">
        <div className="text-center">
          <div className="flex justify-center">
            <Book className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
            Prihlásenie
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Emailová adresa
            </label>
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pl-10 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-zinc-700 dark:text-white dark:placeholder-gray-400"
                placeholder="napriklad@skola.edu"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Heslo
            </label>
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pl-10 pr-10 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-zinc-700 dark:text-white dark:placeholder-gray-400"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-300"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-center text-sm text-red-500">{error}</p>}

          {/* Submit */}
          <div className="text-center">
            <Button
              type="submit"
              size="lg"
              variant="default"
              className="w-full"
              disabled={loginUser.isPending}
            >
              {loginUser.isPending ? (
                <Loader2 className="h-8 w-8 animate-spin" />
              ) : (
                "Prihlásiť sa"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
