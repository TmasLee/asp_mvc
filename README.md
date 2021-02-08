# asp_mvc

A small web app project built using C#, ASP.NET Core, and JS/React.

### **To-Do**:
* See other user friends list

* About me - CV + Pic lol
* Generic repository - Parameterized table name - What is "persistence layer"?

* Test xss / sql injection
* Set up SSL
* Dockerize
* Set up prod environment / db connection string / salt / token payload
* Deploy script - Deploy to AWS ECS? - Inject secrets in appsettings.Development / secrets.json

### **Improvements/Features To-Do**
* On initial site request, return signed in view instead of separate login request
* Logout redirect / Log out + Unauthorized message
* ASP.NET Core request logging
* Clean up endpoints / queries - Reuse endpoints/queries? Better way to pass currentUserId?
* Socket for live friend/user list update
* Clean up LoginModal + GenericModal
* Clean up passed down props - a lot of unnecessary props passed
* Can optimize queries - reduce # of trips to DB
* Better way to update user data instead of repeated setUser/authService.retrieveUser calls