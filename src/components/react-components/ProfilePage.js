import React from 'react';
import Drawer from '@material-ui/core/Drawer';

class ProfilePage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            setOpen: false
        }
    }
    render(){
        return(
            <>
            <button onClick={()=>this.setState({
                setOpen: true
            })}>Open drawer</button>
            <Drawer anchor={'bottom'} open={this.state.setOpen} onClose={()=>this.setState({
                setOpen: false
            })}>
                <p>Hello</p>
            </Drawer>
            </>
        );
    }
}

export default ProfilePage;