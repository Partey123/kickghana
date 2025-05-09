
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-red-900 to-amber-800 text-white p-4 text-center">
      <h1 className="text-8xl font-black mb-6">404</h1>
      <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
      <p className="mb-8 max-w-md text-amber-200">
        The page you are looking for might have been removed or is temporarily unavailable.
      </p>
      <Button asChild className="bg-amber-500 hover:bg-amber-600 text-red-900 font-bold">
        <Link to="/">Return to Home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
