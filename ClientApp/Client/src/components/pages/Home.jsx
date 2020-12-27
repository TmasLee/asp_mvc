import React, { Component } from 'react';

export class Home extends Component {
    render () {
        return (
            <div>
                <h1>Welcome to Antonio's Brother's SPA</h1>
                <br/>
                <p>Sup y'all, it's your boy Thomas. As you can probably tell, I'm Antonio's little brother. We engine together pretty much everyday.</p>
                <p>This site is a small experimental project where I learn C# and the ASP.NET Framework to build multiple SPAs all handled by the same backend.</p>
                <p>This is a SPA built with a C#/ASP.NET Core backend (combining ASP.NET Core MVC with WebApi) with a JS/ReactJS frontend.</p>
                <p>While using the .NET template projects is practical, I figured I'd get a better learning experience by starting (mostly) from scratch and configuring everything myself. Plus using the template project makes it harder to customize anything (like ripping out Razor Pages 🤮).</p>
                <p>You can check out the source code here: <a href="https://github.com/TmasLee/asp_mvc">https://github.com/TmasLee/asp_mvc</a>.</p>
                <p><i>NOTE: This is still a WIP so you might not see best practice everywhere. Didn't have time to tidy up the front end code</i>😅.</p>
            </div>
        );
    }
}
