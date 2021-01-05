import React, { Component } from 'react';

export class Home extends Component {
    render () {
        return (
            <div>
                <h1>Welcome to Antonio's Brother's SPA</h1>
                <br/>
                <p>Sup it's your boy Thomas. As you can probably tell, I'm Antonio's little brother. We engine together pretty much everyday.</p>
                <p>Welcome to my SPA. This is a learning project to practice C#, ASP.NET Core, and OOP principals.</p>
                <p>This was built with a custom ReactJS front end and a customized backend combining ASP.NET Core MVC and WebApi.</p>
                <p>This project is an attempt to make a SPA with session cookie based user authentication with the aforementioned technologies.</p>
                <p>While using .NET template projects and framework/ORM "out-of-the-box" functionalities is practical, I figured I'd get a better learning experience by starting (mostly) from scratch. Some custom configurations (like ripping out Razor Pages 🤮) are a bit easier this way too.</p>
                <p>You can check out the source code here: <a href="https://github.com/TmasLee/asp_mvc">https://github.com/TmasLee/asp_mvc</a>.</p>
                <p><i>DISCLAIMER: This project is still a WIP and contains techniques and design patterns that I'm playing around. You might not see best practice everywhere </i>😅.</p>
            </div>
        );
    }
}
