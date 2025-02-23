"use client";

import { Book, Lock, Mail, Eye, EyeOff } from "lucide-react";
import { useState, type FC } from "react";
import { Button } from "~/components/ui/button";

const LoginForm: FC = () => {
  const [showPassword, setShowPassword] = useState(false);

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
        <form className="mt-6 space-y-4">
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

          {/* Submit */}
          <div className="text-center">
            <Button size="lg" variant="default" className="w-full">
              Prihlásiť sa
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
