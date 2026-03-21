import Hummingbird
import HummingbirdAuth

struct AuthMiddleware: RouterMiddleware {
    func handle(_ request: Request, context: TikezuContext, next: (Request, TikezuContext) async throws -> Response) async throws -> Response {
        if context.identity != nil {
            return try await next(request, context)
        }

        if request.uri.path.hasPrefix("/api") {
            throw HTTPError(.unauthorized)
        } else {
            return .redirect(to: "/signin")
        }
    }
}
