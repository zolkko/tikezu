import { FunctionalComponent } from "preact";
import { JSX } from "preact";
import { TbFaceId as Icon } from "@preact-icons/tb";

const BiometricForm: FunctionalComponent = () => {
  async function isBiometricSupprted(): Promise<boolean> {
    return globalThis.PublicKeyCredential &&
      (await PublicKeyCredential
        .isUserVerifyingPlatformAuthenticatorAvailable());
  }

  async function handleBiometricSetup(
    _e: JSX.TargetedMouseEvent<HTMLButtonElement>,
  ) {
    // TODO (on the server):
    // 1. validate all metadata
    // 2. (optional) validate attestation
    // 3. save credential id and public key data
    // 4. (optional) set server side cookie
    //
    // The auth respose type is PublicKeyCredential
    //  id: string,
    //  rawId: ArrayBuffer,
    //  response: AuthenticatorAttestationResponse {
    //    clientDataJSON: ArrayBuffer,
    //    attestationObject: ArrayBuffer,
    //  }
    //  AttestationObject // CBOR encoded.
    // https://developer.apple.com/videos/play/wwdc2020/10670/
    try {
      if (!(await isBiometricSupprted())) {
        alert("Platform authenticator is not supported");
        throw new Error("Platform authenticator is not supported");
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
            authenticatorAttachment: "platform",
            userVerification: "required",
          },
          // attestation: "direct",
          timeout: 60000,
        };

      const credential = await navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions,
      });

      alert("Credentials are created:");

      if (credential) {
        alert("credentials are ok ish");
        const response = await fetch("/api/auth/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credential),
        });

        if (response.ok) {
          console.log("Biometric authentication successful");
        }
      } else {
        alert("credentials are wrong");
      }
    } catch (error) {
      console.error("Biometric authentication failed:", error);
    }
  }

  function handleNotNow(_e: JSX.TargetedMouseEvent<HTMLButtonElement>) {
    globalThis.location.href = "/";
  }

  return (
    <div class="min-h-screen flex flex-col items-center px-4 justify-center bg-gray-50">
      <div class="w-full max-w-md">
        <div class="flex flex-col items-center space-y-6">
          <div class="flex justify-center">
            <Icon size={260} />
          </div>
          <p class="text-center text-lg">
            Would you like to use Face ID or Touch ID to bypass the username and
            password to signin in next time?
          </p>
          <p class="text-center text-sm text-gray-500">
            You can always set up Face ID later in the settings
          </p>
        </div>
      </div>

      <div class="w-full max-w-md mt-8">
        <div class="space-y-4">
          <button
            type="button"
            onClick={handleBiometricSetup}
            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-offset-2 focus:ring-blue-500 ring-2 ring-blue-500 ring-offset-2"
          >
            Setup
          </button>

          <button
            type="button"
            onClick={handleNotNow}
            class="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Not Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BiometricForm;
