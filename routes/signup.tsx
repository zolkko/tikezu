import SignupForm from "../islands/SignupForm.tsx";

export default function LoginPage() {
  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#F9F9F9",
        margin: 0,
        overflow: "hidden",
      }}
    >
      <div className="flex-grow overflow-y-auto p-5">
        <div className="max-w-md mx-auto mt-10">
          <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
          <SignupForm />
          <div className="mt-6">
            <a href="/" className="text-blue-500 hover:underline">
              Back to Sign-In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
