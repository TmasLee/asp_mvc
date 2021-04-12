# asp_mvc

A small web app project built using C#, ASP.NET Core, and JS/React.

### **To-Do**:
* Serverside caching - Redis
* Front end caching - api responses
* TDD - CI/CD pipeline
* Fix panel text style on collapse
* Handle case where data fetch fails - just load axes?

* Improve component composition
    - Redefined axes for ChartWithZoom
    - Passing getDataPoint function to Home page is bad? - maybe need some HOC like WithDataFetcher
    - Hardcoded tooltip - ReuseChartTooltip

### **Tech Debt/Other Features To-Do**
* Test xss / sql injection
* Streamline modals / components
    - Repeating data fetch/socket logic in componentDidMount - data fetching HOC
    - Clean up unnecessary props passed down
    - Inline styles
    - Make more reusable / composed - Fix Modal HOCs
* Finish setting up simple messaging (page/controller)
* Optimize queries
    - Should UserFriendship/FriendRequest models be views?
* Admin accounts / user management
* On initial site request, return signed in view instead of separate login request
* Unauthorized message/page
* Generic repository - Dynamic queries without LINQ possible?