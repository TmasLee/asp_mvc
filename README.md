# asp_mvc

A small web app project built using C#, ASP.NET Core, and JS/React.

### **To-Do**:
* Test xss / sql injection

### **Improvements/Features To-Do**
* Streamline modals / components
    - Repeating data fetch/socket logic in componentDidMount
    - Clean up unnecessary props passed down
    - Inline styles
    - Make more reusable / composable
* Finish setting up comments controller/page/repo/
* Finish setting up simple messaging (page/controller)
* Optimize queries
    - Should UserFriendship/FriendRequest models be views?
* Admin accounts / user management
* Events/Delegates when user friends >= 1 --> event to send signalR message
* On initial site request, return signed in view instead of separate login request
* Unauthorized message/page
* Generic repository - Dynamic queries without LINQ possible?
* See other user friends list