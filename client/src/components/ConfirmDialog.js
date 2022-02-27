import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';

const ConfirmDialog = ({ handleYes, showConf, setShowConf }) => {
    return (
        <Dialog open={showConf}
            onClose={() => setShowConf(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle>Confirmation</DialogTitle>
            <DialogContent>
                Are you sure you want to continue?
            </DialogContent>
            <DialogActions>
                <Button variant="primary" onClick={() => handleYes()}>Proceed</Button>
                <Button onClick={() => setShowConf(false)}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog;