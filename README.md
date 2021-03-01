# asp_mvc

A small web app project built using C#, ASP.NET Core, and JS/React.

### **To-Do**:
* Socket for live updates
    - Simple messaging?
* Test xss / sql injection

### **Improvements/Features To-Do**
* Clean up LoginModal
* Modal reload on adding or deleting friend / responding to request
* Inline styles
* Check asset bundling
* Clean up unnecessary props passed down
* Better way to update user data instead of repeated setUser/authService.retrieveUser calls

* On initial site request, return signed in view instead of separate login request
* Logout redirect / Log out + Unauthorized message
* Reuse endpoints/queries? Reduce # of trips to DB? Better way to pass currentUserId?
* Generic repository - Dynamic queries without LINQ possible?
* See other user friends list