import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function Input({value,inpValue}) {
  const classes = useStyles();

  return (
    
      <TextField id="standard-basic" label="Your Todos.." value={inpValue} onChange={(e)=>value(e.target.value)} />

  );
}