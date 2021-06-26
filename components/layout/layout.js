import { Fragment } from "react";
import MainHeader from "./main-header";

import Notification from '../ui/notification';

function Layout (props) {
    return <Fragment>
        <Notification>
        <MainHeader />
        <main>
            {props.children}
        </main>
        </Notification>
    </Fragment>
    
}

export default Layout;