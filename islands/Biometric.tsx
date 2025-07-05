import { JSX } from "preact/jsx-runtime/src/index.d.ts";
import { Button } from "../components/Button.tsx";

export function Biometric() {
  function isBiometricSupprted(): boolean {
    return globalThis.PublicKeyCredential &&
      ("create" in globalThis.PublicKeyCredential) &&
      ("isUserVerifyingPlatformAuthenticatorAvailable" in
        globalThis.PublicKeyCredential);
  }

  async function handleBiometricSetup(
    _e: JSX.TargetedMouseEvent<HTMLButtonElement>,
  ) {
    try {
      if (!isBiometricSupprted()) {
        throw new Error("WebAuthn is not supported in this browser");
      }

      const available = await PublicKeyCredential
        .isUserVerifyingPlatformAuthenticatorAvailable();
      if (!available) {
        throw new Error("Platform authenticator is not available");
      }

      // Create authentication options
      const publicKeyCredentialCreationOptions:
        PublicKeyCredentialCreationOptions = {
        challenge: new Uint8Array(32), // Should be generated on server
        rp: {
          name: "karwall",
          id: globalThis.location.hostname,
        },
        user: {
          id: new Uint8Array(16), // Should be unique per user
          name: "user@example.com",
          displayName: "User Name",
        },
        pubKeyCredParams: [{
          type: "public-key",
          alg: -7, // ES256
        }],
        authenticatorSelection: {
          // This prefers built-in authenticators like Face ID
          authenticatorAttachment: "platform",
          userVerification: "required",
        },
        timeout: 60000,
      };

      const credential = await navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions,
      });

      if (credential) {
        // Send the credential to your server for verification
        const response = await fetch("/api/auth/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credential),
        });

        if (response.ok) {
          console.log("Face ID authentication successful");
        }
      }
    } catch (error) {
      console.error("Face ID authentication failed:", error);
    }
  }

  return (
    <div className="flex flex-col space-y-4">
      <Button
        onClick={handleBiometricSetup}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Set up Face ID
      </Button>

      <a
        href="/"
        className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors"
      >
        Skip
      </a>
    </div>
  );
}
