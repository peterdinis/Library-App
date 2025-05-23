import { AlertTriangle, Clock3 } from "lucide-react";
import { FC } from "react";

const TooFastWrapper: FC = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
          <div className="mb-6 flex justify-center">
            <AlertTriangle className="h-16 w-16 text-red-500" strokeWidth={1.5} />
          </div>
  
          <h1 className="mb-4 text-center text-3xl font-bold text-gray-900">
            Príliš veľa požiadaviek
          </h1>
  
          <div className="space-y-4">
            <p className="text-center text-gray-600">
              Odoslali ste príliš veľa požiadaviek v krátkom čase. Prosím,
              počkajte chvíľu a skúste to znova.
            </p>
  
            <div className="flex items-center justify-center space-x-2 text-gray-500">
              <Clock3 className="h-5 w-5 animate-pulse" />
              <span className="text-sm">Skúste to prosím o pár sekúnd...</span>
            </div>
  
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div className="h-full w-1/2 animate-[progress_2s_ease-in-out_infinite] bg-blue-500"></div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default TooFastWrapper