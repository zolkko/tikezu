import SigninForm from "$islands/SigninForm.tsx";

export default function SigninPage() {
  return (
    <div className="mdiv">
      <div className="flex-grow overflow-y-auto p-5">
        <div className="max-w-md mx-auto mt-10">
          <SigninForm />
        </div>
      </div>
    </div>
  );
}
