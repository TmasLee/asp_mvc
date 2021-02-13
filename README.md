# asp_mvc

A small web app project built using C#, ASP.NET Core, and JS/React.

### **To-Do**:
* About me
* Generic repository
    - Parameterized table name
    - What is "persistence layer"?
* Test xss / sql injection

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
* Catch and handle unpredictable errors?
    - Invalid CSRF cookie - wipe cookies?
* Check Asset webpack bundle
* Handle migrations in deploy script? - `dotnet ef migrations script`
* Warnings
    * Storing keys in a directory '/root/.aspnet/DataProtection-Keys' that may not be persisted outside of the container. Protected data will be unavailable when container is destroyed.
    * No XML encryptor configured. Key {3379971b-b818-4fde-97e1-d11d1dd2b80a} may be persisted to storage in unencrypted form.