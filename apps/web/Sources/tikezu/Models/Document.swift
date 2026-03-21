import FluentKit
import Foundation

final class Document: Model, @unchecked Sendable {
    static let schema = "documents"

    @ID(key: .id)
    var id: UUID?

    @Field(key: "title")
    var title: String

    @Field(key: "subtitle")
    var subtitle: String?

    @Field(key: "bookmarked")
    var bookmarked: Bool?

    init() {}

    init(id: UUID? = nil, title: String, subtitle: String? = nil, bookmarked: Bool? = nil) {
        self.id = id
        self.title = title
        self.subtitle = subtitle
        self.bookmarked = bookmarked
    }
}
