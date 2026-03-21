import Hummingbird
import Logging

@main
struct TikezuApp {
    static func main() async throws {
        let app = try await buildApplication()
        try await app.runService()
    }
}

