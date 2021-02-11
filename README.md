# asp_mvc

A small web app project built using C#, ASP.NET Core, and JS/React.

### **To-Do**:
* About me
* Generic repository
    - Parameterized table name
    - What is "persistence layer"?
* Test xss / sql injection

* Set up ECS
    - Connection to ECS and RDS (security groups)
    - Inject secrets
* Deploy script - need to handle migrations `dotnet ef migrations script`
* Set up SSL

### **Improvements/Features To-Do**
* On initial site request, return signed in view instead of separate login request
* Logout redirect / Log out + Unauthorized message
* Reuse endpoints/queries? Reduce # of trips to DB? Better way to pass currentUserId?
* Clean up unnecessary props passed down
* Better way to update user data instead of repeated setUser/authService.retrieveUser calls
* Socket for live updates
* Clean up LoginModal
* Modal reload on adding or deleting friend / responding to request
* See other user friends list
* User avatar + pic upload
* Inline styles
* Set all environment based values (salt) in StartUp