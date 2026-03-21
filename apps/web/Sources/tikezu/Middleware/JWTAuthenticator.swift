import Hummingbird
import HummingbirdAuth
import HummingbirdFluent
import JWTKit
import FluentKit


struct JWTAuthenticator: AuthenticatorMiddleware {

    typealias Identity = User

    typealias Context = TikezuContext

    let jwtSigners: JWTKeyCollection

    init(jwtSigners: JWTKeyCollection) {
        self.jwtSigners = jwtSigners
    }

    func authenticate(request: Request, context: TikezuContext) async throws -> User? {
        guard let token = request.headers.bearer?.token else {
            return nil
        }

        do {
            let payload = try await jwtSigners.verify(token, as: JWTPayloadData.self)
            let userService = UserService(db: context.db)
            return try await userService.findByName(payload.username)
        } catch {
            return nil
        }

        /*
        guard let basic = request.headers.basic else { return nil }
        guard let user = try await database.getUserWithUsername(basic.username) else {
            return nil
        }
        return try await context.threadPool.runIfActive {
            if Bcrypt.verify(basic.password, hash: user.passwordHash) {
                return user
            }
            return nil
        }
        */
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
