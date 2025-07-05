import { Biometric } from "../islands/Biometric.tsx";

export default function Authn() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full space-y-6">
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          Setup Face ID or Touch ID for more secure sign up
        </h1>
        <Biometric />
      </div>
    </div>
  );
}
