import FluentKit

struct CreateDocument: Migration {
    func prepare(on database: Database) -> EventLoopFuture<Void> {
        database.schema("documents")
            .id()
            .field("title", .string, .required)
            .field("subtitle", .string)
            .field("bookmarked", .bool)
            .create()
    }

    func revert(on database: Database) -> EventLoopFuture<Void> {
        database.schema("documents").delete()
    }
}
