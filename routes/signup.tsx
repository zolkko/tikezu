import SignupForm from "../islands/SignupForm.tsx";

export default function SignupPage() {
  return (
    <div className="mdiv">
      <div className="flex-grow overflow-y-auto p-5">
        <div className="max-w-md mx-auto mt-10">
          <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
          <SignupForm />
          <div className="mt-6 text-center">
            <a href="/signin" className="text-blue-500 hover:underline">
              Sign-In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
