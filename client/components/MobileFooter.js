import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import AddIcon from '@material-ui/icons/Add';
import {useRouter} from 'next/router'
import styles from "../styles/mobileFooter.module.css"


const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

export default function MobileFooter() {
  const classes = useStyles();
  const [value, setValue] = React.useState(3);
  const router = useRouter()


  function scrollTop(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return (
    <div className={styles.mobileFooter}>
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
          className={classes.root}
          style={{width: '100%'}}
        >
            <BottomNavigationAction onClick={() => router.push("/profile")} label="Profile" icon={<AccountCircleIcon style={{ fontSize: 32 }}/>} />
            <BottomNavigationAction onClick={() => router.push("/post")} label="Post" icon={<AddIcon style={{ fontSize: 32 }}/>} />
            <BottomNavigationAction onClick={() => router.push("/vote")} label="Vote" icon={<HomeIcon style={{ fontSize: 32 }}/>} />
        </BottomNavigation>
    </div>
  );
}