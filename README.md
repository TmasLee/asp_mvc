# asp_mvc

A small web app project built using C#, ASP.NET Core, and JS/React.

### **To-Do**:
* Check pending request when sending request
* Accepter email showing up in friendlist
* After adding or deleting user - other user needs to refresh friend modal once to see updated list
* Update request modal?
* Modal Rerenders (on delete, etc...) - Modal rerender when > 70 users kinda disorienting

* Add indexes --> Update queries? Why use composite index?

* Generic repository - Parameterized table name - What is "persistence layer"?
* About me - CV + Pic lol
* Forgot password
* See other user friends list
* AirBnb JS style
* MS or Google C# style

* Test xss / sql injection
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
* Add form submit - submit with Enter
* ASP.NET Core request logging
* Clean up endpoints / queries - Reuse endpoints/queries? Better way to pass currentUserId?
* Handle DB exceptions and send appropriate message to front end
* Socket for live friend/user list update