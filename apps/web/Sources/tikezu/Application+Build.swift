import FluentKit
import FluentSQLiteDriver
import Hummingbird
import HummingbirdFluent
import JWTKit

let DEFAULT_SECRET = "change-me"

let DEFAULT_HOST = "127.0.0.1"

let DEFAULT_PORT = 8080

func buildApplication() async throws -> some ApplicationProtocol {
    let env = try await Environment.dotEnv()
    let logger = Logger(label: "tikezu")
    let jwtKeyCollection = await makeJwt(from: env)
    let fluent = try await makeFluent()
    let router = makeRouter(jwtKeyCollection, fluent)

    let bindHostName = env.get("TIKEZU_HOST") ?? DEFAULT_HOST
    let bindHostPort = env.get("TIKEZU_PORT").flatMap { Int($0) } ?? DEFAULT_PORT

    let app = Application(
        router: router,
        configuration: .init(address: .hostname(bindHostName, port: bindHostPort)),
        services: [fluent],
        logger: logger,
    )

    return app
}

func makeRouter(_ jwtKeyCollection: JWTKeyCollection, _ fluent: Fluent) -> Router<TikezuContext> {
    let router = Router(context: TikezuContext.self)
        .add(middleware: LogRequestsMiddleware<TikezuContext>(.info))

    let apiRouter =
        router
        .group("/api/v1")

    apiRouter
        .group("/auth")
        .addRoutes(AuthController(jwtSigners: jwtKeyCollection, fluent: fluent).routes)

    return router
}

func makeJwt(from env: Environment) async -> JWTKeyCollection {
    let jwtSecret = env.get("JWT_SECRET") ?? DEFAULT_SECRET
    let jwtKeyCollection = JWTKeyCollection()
    await jwtKeyCollection.add(hmac: HMACKey(from: jwtSecret), digestAlgorithm: .sha256, kid: JWKIdentifier("tikezu"))

    return jwtKeyCollection
}

func makeFluent() async throws -> Fluent {
    let fluent = Fluent(
        logger: Logger(label: "fluent")
    )

    fluent.databases.use(.sqlite(.file("db.sqlite")), as: .sqlite)
    await fluent.migrations.add(CreateUser(), CreateDocument())

    try await fluent.migrate()

    return fluent
}
