import Hummingbird
import HummingbirdAuth
import HummingbirdFluent
import JWTKit
import Foundation
import FluentKit

/*
struct AuthController {
    let jwtSigners: JWTKeyCollection

    func addRoutes(to group: RouterGroup<TikezuContext>) {
        group.post("/", use: self.signIn)
        group.get("/challenge", use: self.getChallenge)
    }

    struct SignInRequest: Codable {
        let username: String
        let password: String
    }

    struct SignInResponse: Codable {
        let apiToken: String
        let refreshToken: String
    }

    @Sendable
    func signIn(request: Request, context: TikezuContext) async throws -> SignInResponse {
        let input = try await request.decode(as: SignInRequest.self, context: context)
        let userService = UserService(db: context.db)
        
        guard let user = try await userService.authenticateUser(username: input.username, password: input.password) else {
            throw HTTPError(.unauthorized)
        }
        
        let payload = JWTPayloadData(
            subject: .init(value: user.id?.uuidString ?? user.username),
            expiration: .init(value: Date().addingTimeInterval(3600)),
            username: user.username
        )
        
        let token = try await jwtSigners.sign(payload)
        
        // In the original code there were two tokens, we can just use the same or create another one
        let refreshToken = try await jwtSigners.sign(payload) // Should ideally have longer expiration
        
        return SignInResponse(apiToken: token, refreshToken: refreshToken)
    }

    struct ChallengeResponse: Codable {
        let challenge: [UInt8]
        let timestamp: Int64
    }

    @Sendable
    func getChallenge(request: Request, context: TikezuContext) async throws -> ChallengeResponse {
        var bytes = [UInt8](repeating: 0, count: 32)
        let status = SecRandomCopyBytes(kSecRandomDefault, 32, &bytes)
        guard status == errSecSuccess else {
            throw HTTPError(.internalServerError)
        }
        
        return ChallengeResponse(
            challenge: bytes,
            timestamp: Int64(Date().timeIntervalSince1970 * 1000)
        )
    }
}
*/