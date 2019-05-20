import React, {Component} from "react";
import {connect} from 'react-redux';
import Auxiliary from "../../hoc/Auxiliary";
import styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
class Layout extends Component{
    state = {
        showSideDrawer: false
    }
    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        });
    }
    sideDrawerOpenHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer}
        })
    }
    render() {
        return (
            <Auxiliary>
            <Toolbar 
                clicked={this.sideDrawerOpenHandler} 
                isAuth={this.props.isAuthenticated}
            />
            <SideDrawer 
                closed={this.sideDrawerClosedHandler} 
                open={this.state.showSideDrawer} 
                isAuth={this.props.isAuthenticated}
            />
                <main className={styles.Content}>{this.props.children}</main>
            </Auxiliary>
        )
    }
}


const mapStateToProps = state => {
    return{
        isAuthenticated: state.auth.token !== null
    }
}


export default connect(mapStateToProps)(Layout);
