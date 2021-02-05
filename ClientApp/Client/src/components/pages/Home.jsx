import React, { Component } from 'react';

export class Home extends Component {
    render () {
        return (
            <div>
                <h1>Welcome to SlothBook?</h1>
                <br/>
                <p>Welcome to my SPA. This is a learning project where I implement user management and security by hand for some C# and ASP.NET Core practice.</p>
                <p>
                    This was built with a ReactJS front end and a customized back end combining ASP.NET Core MVC and WebApi. While using .NET template projects is practical, I figured I'd get a better learning experience by starting (mostly) from scratch.
                    Also, some custom configurations (like not using Razor Pages 🤮) are a bit easier to set this way.
                </p>
                <p>You can check out the source code here: <a href="https://github.com/TmasLee/asp_mvc">https://github.com/TmasLee/asp_mvc</a></p>
                <p><i>**DISCLAIMER: This is still a WIP. There are a number of things that can be done in a smarter/cleaner way and a few things I'm still figuring out how to do with ASP.NET </i>😅. Not to worry, I'm figuring it all out 💪.</p>
            </div>
        );
    }
}
