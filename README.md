# asp_mvc

A small web app project built using C#, ASP.NET Core, and JS/React.

### **To-Do**:
* Button to test incoming requests - Events/Delegates
* Review Friendship/Message/UserFriendship/FriendRequest models - should they be views?
* Test xss / sql injection

### **Improvements/Features To-Do**
* Streamline modals / components
    - Repeating data fetch/socket logic in componentDidMount
    - Clean up LoginModal
    - Clean up unnecessary props passed down
    - Inline styles
    - Make components more reusable / composable
* Check asset bundling

* Simple messaging
* On initial site request, return signed in view instead of separate login request
* Logout redirect / Log out + Unauthorized message
* Optimize queries (messaging/conversation in particular)
    - Reduce # of trips to DB?
* Generic repository - Dynamic queries without LINQ possible?
* See other user friends list