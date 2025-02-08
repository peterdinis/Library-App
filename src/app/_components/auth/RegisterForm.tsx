import { Book, Mail, Lock } from "lucide-react";
import { FC } from "react";
import { Button } from "~/components/ui/button";

const RegisterForm: FC = () => {
    return (
        <div className="flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8 bg-white dark:bg-zinc-900 p-8 rounded-xl shadow-lg">
            <div className="text-center">
                <div className="flex justify-center">
                    <Book className="h-12 w-12 text-indigo-600" />
                </div>
                <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-sky-50">
                    Prihlásenie
                </h2>
            </div>

            {/* Form */}
            <form className="mt-8 space-y-6">
                <div className="space-y-4">

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium dark:text-sky-50 text-gray-700">
                            Email address
                        </label>
                        <div className="mt-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="pl-10 block w-full rounded-lg border border-gray-300 py-3 px-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="you@school.edu"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium dark:text-sky-50 text-gray-700">
                            Password
                        </label>
                        <div className="mt-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="pl-10 block w-full rounded-lg border border-gray-300 py-3 px-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>
                </div>

                <div className="text-center">
                   <Button size={"lg"} variant={"default"}>
                    Prihlásiť sa
                   </Button>
                </div>
            </form>
        </div>
        </div>
    )
}

export default RegisterForm