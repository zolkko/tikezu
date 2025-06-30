import SigninForm from "../islands/SigninForm.tsx";

interface User {
  username: string;
  password: string;
}

// Static list of users (in real applications, this would be in a database)
const USERS: User[] = [
  {
    username: "user",
    password: "user123",
  },
];

export function authenticateUser(
  username: string,
  password: string,
): User | null {
  const user = USERS.find(
    (u) => u.username === username && u.password === password,
  );
  return user || null;
}

export default function SigninPage() {
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
          <SigninForm />
          <div className="mt-6">
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign-Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
