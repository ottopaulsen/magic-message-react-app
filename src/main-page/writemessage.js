import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';



const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        paddingTop: '25px'
    },
    button: {
        width: '21px',
    },
    textField: {
        marginLeft: 0,
        width: '80%',
        marginTop: '0px',
        marginBottom: '0px',
    },
});



class WriteMessage extends Component {
    state = {}

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    
    render = () => {
        const { classes } = this.props;
        return (
            <Paper className={classes.root}>
                <TextField
                    id="message-input"
                    label="Message"
                    className={classes.textField}
                    value={this.state.message}
                    onChange={this.handleChange('message')}
                    margin="normal"
                    variant="outlined"
                    autoFocus={true}
                    fullWidth={false}
                />
                <Button style={{ container: { height: 10} }} variant="contained" size="small" color='primary' className={classes.button}>Send</Button>
            </Paper>
        );
    }
}

WriteMessage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WriteMessage);