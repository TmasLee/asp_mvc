import React, { Component } from 'react';

import "../../../css/App.css";

export class Home extends Component {
    render () {
        return (
            <div>
                <h1>Welcome to Antonio's Brother's SPA</h1>
                <br/>
                <p>Sup, my name is Thomas, and as you can probably tell, I'm Antonio's little brother.</p>
                <br/>
                <p>This site is a small project where I build a web app along with other sub-apps and programming exercises from the ground up using everything I learned while working.</p>
                <br/>
                <p>A little about this project, this is a SPA built with a C#/ASP.NET Core backend (combining ASP.NET Core MVC and WebApi concepts) with a JS/ReactJS frontend.</p>
                <br/>
                <p>While using the dotnet template projects is practical, I figured that'd be too easy and it'd be harder to customize anything (AKA ripping out Razor Pages 🤮). So instead I opted to start (mostly) from scratch and configure everything myself.</p>
                <br/>
                <p>You can checkout the source code here: <a href="https://github.com/TmasLee/asp_mvc">https://github.com/TmasLee/asp_mvc</a> </p>
            </div>
        );
    }
}
