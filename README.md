# asp_mvc

A small web app project built using C#, ASP.NET Core, and JS/React.

### **To-Do**:
* Why UsersListModal reload?
* Handle DB duplicate key constraint exception
* Fix add friend - how am i adding myself lol - might need to implement actionUser - Pending section in request modal
* Clean up endpoints - Smarter requests for friends/requests (there's probably a better way to pass currentUserId)
* Add indexes --> Update queries? Why use composite index?

* Generic repository - Parameterized table name - What is "persistence layer"?
* About me - Pic lol

* Format SQL in code
* AirBnb JS style
* MS or Google C# style

* Test another user in incognito
* Forgot password
* See other user friends

* Test xss / sql injection
* Web server logging

* Set up SSL
* Dockerize
* Set up prod environment / db connection string / salt / token payload
* Deploy script - Deploy to AWS ECS? - Inject secrets in appsettings.Development / secrets.json

### **Improvements/Features To-Do**
* On initial site request, return signed in view instead of separate login request
* Logout redirect / Log out + Unauthorized message
* New # of requests badge
* Use functional components wherever I can
* Site icon favicon?