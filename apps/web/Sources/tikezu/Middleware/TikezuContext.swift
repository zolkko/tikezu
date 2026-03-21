import Hummingbird
import HummingbirdAuth
import HummingbirdFluent
//import Logging
//import NIOCore
import FluentKit


struct TikezuContext: RequestContext, AuthRequestContext {
    var coreContext: CoreRequestContextStorage
    var identity: User?
    var db: Database

    init(source: Source) {
        fatalError("to make an instance of the context use factory method")
    }

    init(source: Source, db: Database) {
        self.coreContext = .init(source: source)
        self.identity = nil
        self.db = db
    }
}
