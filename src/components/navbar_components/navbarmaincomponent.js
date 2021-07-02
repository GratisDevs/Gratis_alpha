import React, {useState} from 'react';
import clsx from 'clsx';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import Button from 'react-bootstrap/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme)=>({
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    justifyContent: 'flex-start',
  },
  list: {
    width: 200,
  },
  paper:{
    backgroundColor: 'papayawhip'
  }
}));

function NavbarMainComponent({logout, fetchPost, uid}) {
  const classes = useStyles();
  const [open, setOpen]=useState(false);
  const options = [
    {"value": "Computer Science","name":"Computer Science"},
    {"value": "Electronics","name":"Electronics"},
    {"value": "Mechanical","name":"Mechanical"},
    {"value": "Electrical","name":"Electrical"},
    {"value": "Civil","name":"Civil"}
  ];
  const list = () => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={()=>setOpen(false)}
      onKeyDown={()=>setOpen(false)}
    >
      <div className={classes.drawerHeader}>
          <IconButton onClick={()=>setOpen(false)}>
          <i class="fa fa-chevron-right" aria-hidden="true" style={{fontSize: 'x-large'}}></i>
          </IconButton>
        </div>
        <Divider />
      <List>
        {['Home','Profile', 'Users'].map((text, index) => {
          if(index==0){
            return(
              <ListItem button key={text}>
                <ListItemIcon><i class="fa fa-home" aria-hidden="true" style={{fontSize: 'x-large'}}></i></ListItemIcon>
                <Link to="/home" style={{textDecoration: 'none'}}><ListItemText primary={text} /></Link>
              </ListItem>
            );
          }
          else if(index==1){
            return(
              <ListItem button key={text}>
                <ListItemIcon><i class="fa fa-user" aria-hidden="true" style={{fontSize: 'x-large'}}></i></ListItemIcon>
                <Link to={`/profile/${uid}`} style={{textDecoration: 'none'}}><ListItemText primary={text} /></Link>
              </ListItem>
            );
          }
          else{
            return(
              <ListItem button key={text}>
                <ListItemIcon><i class="fa fa-users" aria-hidden="true" style={{fontSize: 'x-large'}}></i></ListItemIcon>
                <Link to="/userSearch" style={{textDecoration: 'none'}}><ListItemText primary={text} /></Link>
              </ListItem>
            );
          }
          /*<ListItem button key={text}>
            <ListItemIcon>{index % 3 === 0 ? <i class="fa fa-home" aria-hidden="true" style={{fontSize: 'x-large'}}></i> : 
            <i class="fa fa-user" aria-hidden="true" style={{fontSize: 'x-large'}}></i>}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>*/
      })}
      </List>
    </div>
  );
	return (
    <>
		<Navbar expand="md" fixed="top">
  <Navbar.Brand href="#home" style={{}}>
				<Link
					to="/home"
					style={{ textDecoration: 'none', color: 'navajowhite', fontSize: 'larger', fontWeight: '600' }}
					className="logo-name font-weight-bold "
				>
					GratiS'{' '}
				</Link>
			</Navbar.Brand>
      <NavDropdown title={<i className="fa fa-filter" aria-hidden="true" style={{fontSize: 'x-large'}}></i>} 
      id="basic-nav-dropdown" alignRight>
        {
          options.map(elem=><span className="dropdown-item nav-items" onClick={()=>fetchPost(elem.name)} style={{fontWeight: '600'}}>{elem.value}</span>)
        }
      </NavDropdown>
  <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={()=>setOpen(true)} />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Link to="/" 
      style={{ textDecoration: 'none', color: 'navajowhite', fontSize: 'larger', fontWeight: '700' }}
        >Home</Link> 
      <Link to="/profile" 
      style={{ textDecoration: 'none', color: 'navajowhite', fontSize: 'larger', fontWeight: '700' }}
        >Profile</Link>
        <Link to="/userSearch" 
      style={{ textDecoration: 'none', color: 'navajowhite', fontSize: 'larger', fontWeight: '700' }}
        >Users</Link>
    </Nav>
    <Form inline>
	  <Button variant="outline-success" style={{margin: '5px', color: 'navajowhite', fontWeight: '700'}} onClick={logout}>Logout</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>
<Drawer anchor={'right'} open={open} onClose={()=>setOpen(false)} id="drawer" classes={{paper: classes.paper}}>
                {list()}
                <Form inline style={{justifyContent: 'center'}}>
	  <Button variant="outline-success" style={{margin: '5px', color: 'green', fontWeight: '700'}} onClick={logout}>Logout</Button>
    </Form>
            </Drawer>
            </>
			
	);
}

export default NavbarMainComponent;