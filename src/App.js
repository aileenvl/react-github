import './App.css';
import { BrowserRouter as Router, useRouteMatch, useLocation, Redirect, Route, Link, Switch, useParams,useHistory  } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';


const API='https://api.github.com/users/';
const topFive = ["grahamcampbell","fabpot","weierophinney","rkh","josh"];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  rootCard: {
    display: 'flex',
    justifyContent: 'center'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
    color: '#fff'
  },
  userButton: {
    textDecoration: 'none',
    backgroundColor: '#3f51b5',
    color: '#fff',
    padding: '15px 13px;',
    border: '1px solid #CCCCCC',
    borderRadius:'11px'
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));
export default function App() {
  const classes = useStyles();

  
   return (
     <div>
        <Router>
          <AppBar position="static">
            <Typography variant="h6" className={classes.title}>
            <Link to={'/'} className={classes.title}>Home</Link>
            </Typography>
          </AppBar>
          <Switch>
            <Route exact path="/">
              <Users></Users>
            </Route>
            <Route path="/user/:id">
              <User></User>
            </Route>
          </Switch>
      </Router>
     </div>
   )
}

function Users() {
  const match = useRouteMatch('/');
  const [users, setUsers] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    const asyncFetch = async user => {
      const response = await fetch(API + user);
      return response.json();
    }

    const responseData = async () => {
      return Promise.all(
        topFive.map(user => {
          return asyncFetch(user)
        })
      )
    }

    responseData()
      .then(res => setUsers(res))
  }, [])

 return (
  match ? <ul className="userList">
  {users.map(user => (
    <li key={user.id}>
      <Link className={classes.userButton} to={{pathname:`/user/${user.id}`, state: user}}>{user.name}</Link>
    </li>
  ))}
</ul> : <p>Error</p>)
}

function User() {
  const classes = useStyles();
  const location = useLocation();
  console.log(location)
  return  (
    <div>
        <Card className={classes.rootCard}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {location.state.name}
            </Typography>
            <Avatar alt="Remy Sharp" src={location.state.avatar_url} className={classes.large}/>
            <Typography className={classes.pos} color="textSecondary">
              {location.state.location}
            </Typography>
          </CardContent>
        </Card>
    </div>
  )
}
