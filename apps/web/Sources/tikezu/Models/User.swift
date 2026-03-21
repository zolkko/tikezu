import FluentKit
import Foundation
import Hummingbird
import HummingbirdAuth

final class User: Model, @unchecked Sendable {
    static let schema = "users"

    @ID(key: .id)
    var id: UUID?

    @Field(key: "username")
    var username: String

    @Field(key: "password_hash")
    var passwordHash: String

    @Field(key: "created_at")
    var createdAt: Date?

    @Field(key: "biometric_enabled")
    var biometricEnabled: Bool?

    @Field(key: "biometric_challenge")
    var biometricChallenge: String?

    init() {}

    init(id: UUID? = nil, username: String, passwordHash: String, createdAt: Date? = nil, biometricEnabled: Bool? = nil, biometricChallenge: String? = nil) {
        self.id = id
        self.username = username
        self.passwordHash = passwordHash
        self.createdAt = createdAt ?? Date()
        self.biometricEnabled = biometricEnabled
        self.biometricChallenge = biometricChallenge
    }
}
