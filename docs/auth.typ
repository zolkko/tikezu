= User authentication and authorization process

== Opening the Web Application

There are a few ways how a user can open the app.
The very first time a user must open a mobile browser and navigate to the Web Application\`s website.

When user\`s HTTP GET request hits the app backend server,
the server must output the specialized HTTP headers and HTML metadata,
that will inform client\`s browser that the website is actually a Web Application.


Apple provides the #link("https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html")[document]
that describes how to configure Web Applications.


Additionally emitted HTTP headers must follow security best practices described at #link("https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/")[OWASP Security Guidelines].



== Authentication Screen

 + A user opens the application.
 + If WebAuthn is available and there are credentials the app must use them.
 + If there are no credentials then the user is prompted to either sign-in or sign up.
 + If the app fails to authenticate the user using WebAuthn then the user is navigated to sign-in/sign-up screen.
 + Once a user successfully signed up the app must ask if the user would like to start using WebAuthn for thurther authentication in the app.
 + If the user rejects setting up the WebAuthn, it must be redirected to the main screen of the app.
