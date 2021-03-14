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
* Check asset bundling

* Optimize queries (messaging/conversation in particular)
    - Review Friendship/Message - set Cascade
    - Should UserFriendship/FriendRequest models be views?
    - Reduce # of trips to DB?
* Admin accounts / user management
* Simple messaging
* Events/Delegates when user friends >= 1 --> event to send signalR message
* On initial site request, return signed in view instead of separate login request
* Unauthorized message
* Generic repository - Dynamic queries without LINQ possible?
* See other user friends list