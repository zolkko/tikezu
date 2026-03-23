import Hummingbird
import HummingbirdAuth
import HummingbirdFluent
import FluentKit


struct TikezuContext: RequestContext, AuthRequestContext {
    var coreContext: CoreRequestContextStorage
    var identity: User?

    init(source: Source) {
        self.coreContext = .init(source: source)
        self.identity = nil
    }
}
