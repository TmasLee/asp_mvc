import React, { Component } from 'react';

export class Home extends Component {
    render () {
        return (
            <div>
                <h1>Welcome to Antonio's Brother's SPA</h1>
                <br/>
                <p>Welcome to my SPA. This is a learning project where I implement user login and security by hand for some C# and ASP.NET Core practice.</p>
                <p>
                    This was built with a ReactJS front end and a customized back end combining ASP.NET Core MVC and WebApi. While using .NET template projects is practical, I figured I'd get a better learning experience by starting (mostly) from scratch.
                    Also, some custom configurations (like not using Razor Pages 🤮) are a bit easier to set this way.
                </p>
                <p>You can check out the source code here: <a href="https://github.com/TmasLee/asp_mvc">https://github.com/TmasLee/asp_mvc</a></p>
                <p><i>**DISCLAIMER: This project is still a WIP as I'm still figuring out how to do some things with ASP.NET </i>😅.</p>
            </div>
        );
    }
}
