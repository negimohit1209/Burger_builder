import React from "react";
import Auxiliary from "../../hoc/Auxiliary";
import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const Layout = props => {
    return (
        <Auxiliary>
        <Toolbar />
            <div>Toolbar , SideDrawer, BackDrop</div>
            <main className={styles.Content}>{props.children}</main>
        </Auxiliary>
    );
};

export default Layout;
