import React, { Component } from 'react';

export class Home extends Component {
    render () {
        return (
            <div>
                <h1>Welcome to Antonio's Brother's SPA</h1>
                <br/>
                <p>Sup y'all, it's your boy Thomas. As you can probably tell, I'm Antonio's little brother. We engine together pretty much everyday.</p>
                <p>This site is a small experimental project where I build multiple SPAs all handled by the same backend.</p>
                <p>A little about this project, this is a SPA built with a C#/ASP.NET Core backend (combining ASP.NET Core MVC and WebApi concepts) with a JS/ReactJS frontend.</p>
                <p>While using the dotnet template projects is practical, I figured that'd be too easy and it'd be harder to customize anything (like ripping out Razor Pages 🤮). So instead I opted to start (mostly) from scratch and configure everything myself.</p>
                <p>You can check out the source code here: <a href="https://github.com/TmasLee/asp_mvc">https://github.com/TmasLee/asp_mvc</a>.</p>
            </div>
        );
    }
}
