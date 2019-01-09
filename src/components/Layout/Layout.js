import React from "react";
import Auxiliary from "../../hoc/Auxiliary";
import styles from './Layout.module.css';

const Layout = props => {
    return (
        <Auxiliary>
            <div>Toolbar , SideDrawer, BackDrop</div>
            <main className={styles.Content}>{props.children}</main>
        </Auxiliary>
    );
};

export default Layout;
