"use client"

import { AlertTriangle, Clock3 } from "lucide-react";
import { NextPage } from "next";

const TooFastPage: NextPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                <div className="flex justify-center mb-6">
                    <AlertTriangle className="h-16 w-16 text-red-500" strokeWidth={1.5} />
                </div>

                <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">
                    Too Many Requests
                </h1>

                <div className="space-y-4">
                    <p className="text-gray-600 text-center">
                        You've made too many requests in a short period. Please wait a moment before trying again.
                    </p>

                    <div className="flex items-center justify-center space-x-2 text-gray-500">
                        <Clock3 className="h-5 w-5 animate-pulse" />
                        <span className="text-sm">Please try again in a few seconds...</span>
                    </div>

                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full w-1/2 animate-[progress_2s_ease-in-out_infinite]"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TooFastPage