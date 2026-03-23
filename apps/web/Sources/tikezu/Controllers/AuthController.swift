import Foundation
import Hummingbird
import HummingbirdFluent
import JWTKit

struct AuthController {

    let fluent: Fluent

    let jwtSigners: JWTKeyCollection

    init(jwtSigners: JWTKeyCollection, fluent: Fluent) {
        self.jwtSigners = jwtSigners
        self.fluent = fluent
    }

    var routes: RouteCollection<TikezuContext> {
        return RouteCollection(context: TikezuContext.self)
            .post("/", use: self.signIn)
            .post("/refresh", use: self.refresh)
    }

    struct SignInRequest: Decodable {
        let username: String
        let password: String
    }

    struct SignInResponse: ResponseEncodable {
        let apiToken: String
        let refreshToken: String
    }

    @Sendable
    func signIn(request: Request, context: TikezuContext) async throws -> SignInResponse {
        let input = try await request.decode(as: SignInRequest.self, context: context)
        let userService = UserService(db: fluent.db())

        guard let user = try await userService.authenticateUser(username: input.username, password: input.password) else {
            throw HTTPError(.unauthorized)
        }

        return try await makeSignInResponse(subject: user.id?.uuidString ?? user.username, username: user.username)
    }

    struct RefreshTokenRequest: Decodable {
        let refreshToken: String
    }

    @Sendable
    func refresh(request: Request, context: TikezuContext) async throws -> SignInResponse {
        let input = try await request.decode(as: RefreshTokenRequest.self, context: context)
        let payload = try await jwtSigners.verify(input.refreshToken, as: JWTPayloadData.self)
        return try await makeSignInResponse(subject: payload.subject.value, username: payload.username)
    }

    private static let DEFAULT_EXP: TimeInterval = 3600

    private static let DEFAULT_REFRESH_EXP: TimeInterval = DEFAULT_EXP * 24

    private func makeSignInResponse(subject: String, username: String) async throws -> SignInResponse {
        let token = try await jwtSigners.sign(
            JWTPayloadData(
                subject: .init(value: subject),
                expiration: .init(value: Date().addingTimeInterval(Self.DEFAULT_EXP)),
                username: username
            ))

        let refreshToken = try await jwtSigners.sign(
            JWTPayloadData(
                subject: .init(value: subject),
                expiration: .init(value: Date().addingTimeInterval(Self.DEFAULT_REFRESH_EXP)),
                username: username
            ))

        return SignInResponse(apiToken: token, refreshToken: refreshToken)
    }
}
