import "./index.css"


function Account() {
    return (

        <div className="d-flex">
        <div className="d-none d-md-block">
            <ul className="account-margin">
                <li><a href="/Kanbas/Account/Notifications/index.html"> Notifications</a></li>
                <li><a href="/Kanbas/Account//Profile/screen.html"> Profile</a></li>
                <li><a href="/Kanbas/Account/Files/index.html"> Files</a></li>
                <li><a href="/Kanbas/Account/Settings/index.html"> Settings</a></li>
                <li><a href="/Kanbas/Account/ePortfolios/index.html"> ePortfolios</a></li>
                <li><a href="/Kanbas/Account/SharedContent/index.html"> Shared Content</a></li>
                <li><a href="/Kanbas/Account/TheHub/index.html"> The Hub</a></li>
                <li><a href="/Kanbas/Account/Qwickly/index.html"> Qwickly Course Tool</a></li>
                <li><a href="/Kanbas/Account/GlobalAnnoucements/index.html"> Global Annoucements</a></li>
            </ul>
        </div>

        <div className="flex-fill account-margin">
            <header>Venice Lin's Profile</header>
            <hr />
                <table width="100%">
                    <tr>
                        <td><h1>Venice Lin</h1></td>
                        <td>
                            <a href="/Kanbas/Account/Profile/Edit/screen.html"><button>Edit Profile</button></a>
                        </td>
                    </tr>
                </table>

                <h2> Contact</h2>
                <p>
                    No registed services, you can add some on the
                    <a href="/Kanbas/Account/Settings/index.html"> settings</a>
                    page
                </p>

                <h2> Biography</h2>
                <p>Student, Software Engineer, Cake Lover</p>

                <h2> Links</h2>
                <a href="https://www.youtube.com/"> YouTube</a>
        </div>
</div>


    );
}






export default Account