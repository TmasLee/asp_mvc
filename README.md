# asp_mvc

A small web app project built using C#, ASP.NET Core, and JS/React.

### **To-Do**:
* About me - CV
* Generic repository - Parameterized table name - What is "persistence layer"?

* Test xss / sql injection
* Set up SSL
* Dockerize
* Set up prod environment / db connection string / salt / token payload
* Deploy script - Deploy to AWS ECS? - Inject secrets in appsettings.Development / secrets.json

### **Improvements/Features To-Do**
* On initial site request, return signed in view instead of separate login request
* Logout redirect / Log out + Unauthorized message
* Reuse endpoints/queries? Reduce # of trips to DB? Better way to pass currentUserId?
* Clean up passed down props - a lot of unnecessary props passed
* Better way to update user data instead of repeated setUser/authService.retrieveUser calls
* Socket for live updates
* Clean up LoginModal
* Modal reload on adding or deleting friend / responding to request
* See other user friends list
* User avatar + pic upload