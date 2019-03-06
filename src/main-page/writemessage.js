import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Button, TextField } from '@material-ui/core';

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        paddingTop: '25px'
    },
    button: {
        width: '20%',
    },
    textField: {
        marginLeft: '0px',
        marginRight: '0px',
        width: '80%',
        marginTop: '0px',
        marginBottom: '0px',
        disableUnderline: true,
    },
});


class WriteMessage extends Component {
    state = { message: '' }

    handleChange = event => {
        this.setState({
            message: event.target.value,
        });
    };

    sendMessage = () => {
        console.log('Sending message: ' + this.state.message)
        this.props.sendMessage(this.props.screenId, this.state.message, this.props.lifetime)
        this.setState({ message: '' })
    }

    render = () => {
        const { classes } = this.props;
        return (
            <Paper className={classes.root} elevation={0}>
                <TextField
                    id="message-input"
                    label="Message"
                    className={classes.textField}
                    variant="outlined"
                    placeholder="Write your message text here"
                    autoFocus={true}
                    fullWidth={false}
                    value={this.state.message}
                    onChange={this.handleChange}
                    onKeyPress={(ev) => {
                        if (ev.key === 'Enter') {
                            this.sendMessage()
                            ev.preventDefault();
                        }
                    }}
                />
                <Button
                    style={{ container: { height: 10 } }}
                    variant="contained"
                    size="small"
                    color='primary'
                    className={classes.button}
                    onClick={this.sendMessage}
                >Send</Button>
            </Paper>
        );
    }
}

WriteMessage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WriteMessage);