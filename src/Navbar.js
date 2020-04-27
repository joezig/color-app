import React, { Component } from 'react';
// import './Navbar.css';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';

import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Slider from 'rc-slider';
import Snackbar from '@material-ui/core/Snackbar';

import 'rc-slider/assets/index.css';
import styles from './styles/NavbarStyles';


class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            format: 'hex',
            open: false
        }
        this.handleFormatChange = this.handleFormatChange.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);
    }

    closeSnackbar() {
        this.setState({ open: false })
    }

    handleFormatChange(evt) {
        this.setState({
            format: evt.target.value,
            open: true
        });
        this.props.handleChange(evt.target.value);
    }
    render() {
        const { level, changeLevel, showingAllColors, classes } = this.props;
        const { format } = this.state;
        return(
            <header className={classes.Navbar}>
                <div className={classes.logo}>
                    <Link to='/'>React Color Picker</Link>
                </div>
                {showingAllColors && (
                    <div>
                        <span>Level: {level}</span>
                        <div className={classes.slider}>
                            <Slider 
                                defaultValue={level} 
                                min={100} 
                                max={900} 
                                step={100}
                                onAfterChange={changeLevel} 
                            />
                        </div>
                    </div>
                )}
                <div className={classes.selectContainer}>
                    <Select value={format} onChange={this.handleFormatChange} >
                        <MenuItem value='hex'>HEX - #ffffff</MenuItem>
                        <MenuItem value='rgb'>RGB - rgb(255, 255, 255)</MenuItem>
                        <MenuItem value='rgba'>RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
                    </Select>
                </div>
                <Snackbar 
                    anchorOrigin={{vertical: 'bottom', horizontal: 'left'}} 
                    action={[
                        <IconButton 
                            onClick={this.closeSnackbar} 
                            color='inherit' 
                            key='close' 
                            aria-label='close'
                        >
                            <CloseIcon />
                        </IconButton>
                    ]}
                    autoHideDuration={3000}
                    ContentProps={{'aria-describedby': 'message-id'}}
                    message={<span id='message-id'>Format Changed To {format.toUpperCase()}</span>}
                    onClose={this.closeSnackbar}
                    open={this.state.open} 
                />
            </header>
        );
    }
}

export default withStyles(styles)(Navbar);