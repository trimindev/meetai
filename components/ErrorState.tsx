import { AlertTriangleIcon } from "lucide-react";

export function ErrorState({
  title = "Something went wrong",
  message = "An error occurred while loading the data. Please try again.",
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <AlertTriangleIcon className="w-8 h-8 text-red-500" />
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  );
}

export default ErrorState;
