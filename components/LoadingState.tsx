import { Loader2Icon } from "lucide-react";

export function LoadingState({
  title = "Loading...",
  describtion = "Please wait while we load the data.",
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <Loader2Icon className="w-8 h-8 animate-spin text-gray-500" />
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      <p className="text-sm text-gray-500">{describtion}</p>
    </div>
  );
}
export default LoadingState;
