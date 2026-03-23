import Hummingbird
import HummingbirdAuth
import HummingbirdFluent
import JWTKit
import FluentKit


struct JWTAuthenticator: AuthenticatorMiddleware {

    typealias Identity = User

    typealias Context = TikezuContext

    let jwtSigners: JWTKeyCollection

    let fluent: Fluent

    init(jwtSigners: JWTKeyCollection, fluent: Fluent) {
        self.jwtSigners = jwtSigners
        self.fluent = fluent
    }

    func authenticate(request: Request, context: TikezuContext) async throws -> User? {
        guard let token = request.headers.bearer?.token else {
            return nil
        }

        do {
            let payload = try await jwtSigners.verify(token, as: JWTPayloadData.self)
            let userService = UserService(db: fluent.db())
            return try await userService.findByName(payload.username)
        } catch {
            return nil
        }
    }

    private func tokenFromCookies(request: Request) -> String? {
        var token: String? = nil
        if let cookies = request.headers[.cookie] {
            let parts = cookies.split(separator: ";")
            if let tokenPart = parts.first(where: { $0.trimmingCharacters(in: .whitespaces).hasPrefix("auth-token=") }) {
                token = String(tokenPart.trimmingCharacters(in: .whitespaces).dropFirst("auth-token=".count))
            } else if let bearer = request.headers.bearer {
                token = bearer.token
            } else {
                return nil
            }
        }
        return token
    }
}
