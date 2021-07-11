import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
// import { withStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import styles from "../styles/imagesVoteToggle.module.css"

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  // const styles = {
  //   root: {
  //     padding: "10px"
  //   }
  // };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
      
    >
      {value === index && (
        <Box style={{padding: "0"}} p={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function FullWidthTabs(props) {
  const classes = useStyles();
  const theme = useTheme();


  const {image1, image2} = props.images
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.chosen(newValue)
  };

  const handleChangeIndex = (index) => {
    setValue(index);
    props.chosen(index)
  };

  return (
    <div>
      <AppBar position="static" color="default">
        <p className={styles.orText}>or</p>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          // aria-label="full width tabs example"
        >
          <Tab label="One" {...a11yProps(0)} />
          <Tab label="Two" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
          <TabPanel 
            // inputProps={{
            //   MuiBox: {
            //     padding: "0"
            //   }
            // }} 
            value={value} 
            index={0} 
            dir={theme.direction}
            >
            <img className={styles.voteImage} src={image1}/>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
              <img className={styles.voteImage} src={image2}/>
          </TabPanel>

      </SwipeableViews>
    </div>
  );
}
