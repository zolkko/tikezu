import FluentKit
import Foundation
import HummingbirdBcrypt

//import Hummingbird
//import HummingbirdAuth

struct UserService {
    let db: Database

    func findByName(_ username: String) async throws -> User? {
        try await User.query(on: db)
            .filter(\.$username == username)
            .first()
    }

    func authenticateUser(username: String, password: String) async throws -> User? {
        guard let user = try await findByName(username) else {
            return nil
        }
        
        if Bcrypt.verify(password, hash: user.passwordHash) {
            return user
        }
        
        return nil
    }

    func createUser(username: String, password: String) async throws {
        let hash = Bcrypt.hash(password)
        let user = User(username: username, passwordHash: hash)
        try await user.create(on: db)
    }
}
