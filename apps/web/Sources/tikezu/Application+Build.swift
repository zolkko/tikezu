import FluentKit
import Hummingbird
import HummingbirdAuth
import HummingbirdBcrypt
import HummingbirdFluent
import JWTKit
import SQLiteNIO
import FluentSQLiteDriver


let DEFAULT_SECRET = "change-me"

let DEFAULT_HOST = "127.0.0.1"

let DEFAULT_PORT = 8080


func buildApplication() async throws -> some ApplicationProtocol {
    let env = try await Environment.dotEnv()
    let logger = Logger(label: "tikezu")

//    let jwtKeyCollection = await makeJwt(from: env)

    let fluent = try await makeFluent()
    let router = Router(context: TikezuContext.self)
    router.add(middleware: LogRequestsMiddleware<TikezuContext>(.info))
//    router.add(middleware: FileMiddleware<TikezuContext>(rootFolder: "../public"))

    /*
        context: { request, source in
            return TikezuContext(source: source, db: fluent.db())
        }
     */

    let bindHostName = env.get("TIKEZU_HOST") ?? DEFAULT_HOST
    let bindHostPort = env.get("TIKEZU_PORT").flatMap { Int($0) } ?? DEFAULT_PORT
    let app = Application(
        router: router,
        configuration: .init(address: .hostname(bindHostName, port: bindHostPort)),
        services: [fluent],
        logger: logger,
    )

//  Auth Routes
//  AuthController(jwtSigners: jwtSigners).addRoutes(to: router.group("api/auth"))
//
//  Authenticated Group
//  let authenticatedGroup = router.group()
//      .addMiddleware(JWTAuthenticator(jwtSigners: jwtSigners))
//      .addMiddleware(AuthMiddleware())
//
//  authenticatedGroup.get("/profile") { req, context in
//      let user = try context.requireIdentity()
//      return "Hello \(user.username)!"
//  }

    router.get("/") { req, context in
        return "Hello, Swift Hummingbird!"
    }

    return app
}

func makeJwt(from env: Environment) async -> JWTKeyCollection {
    let jwtSecret = env.get("JWT_SECRET") ?? DEFAULT_SECRET
    let jwtKeyCollection = JWTKeyCollection()
    await jwtKeyCollection.add(hmac: "jwtSecret", digestAlgorithm: .sha256, kid: JWKIdentifier("auth-jwt"))

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
