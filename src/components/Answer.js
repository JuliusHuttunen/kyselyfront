import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function Answer(props) {
  const [question, setQuestion] = useState({qst: props.question.qst, qsttype: props.question.qsttype, answer: props.question.answer});

  const refreshPage = () => {
    setTimeout(() => {
    window.location.reload();
  }, 1000);
  }

  const handleClose = () => {
    props.updateQuestion(props.question._links.self.href, question);
    props.saveQuestion(question);
    refreshPage();
  }

  const inputChanged = (event) => {
    setQuestion({...question, [event.target.name]: event.target.value});
  }


  
  if(question.qsttype==="radio"){
    return(
      <div>
       <FormControl component="fieldset" >
       <FormLabel component="legend">Anna arvo välillä 1-5:</FormLabel>
            <RadioGroup row aria-label="answer" name="answer"  value={question.answer}
             onChange={inputChanged} onBlur={handleClose}>
              <FormControlLabel value="1" control={<Radio />} label="1" />
              <FormControlLabel value="2" control={<Radio />} label="2" />
              <FormControlLabel value="3" control={<Radio />} label="3" />
              <FormControlLabel value="4" control={<Radio />} label="4" />
              <FormControlLabel value="5" control={<Radio />} label="5" />
            </RadioGroup>
        </FormControl>
      </div>
      )
  }
  
  if(question.qsttype==="text"){
  return(
    <div>
          <TextField
            margin="dense"
            id="answer"
            name="answer"
            value={question.answer}
            onChange={inputChanged}
            onBlur={handleClose}
            label="Vastauksesi:"
            InputLabelProps={{
              shrink: true,
            }}
          />
    </div>
  )
}
  if(question.qsttype=== "number"){
    return(
    <div>
      <TextField
    id="answer"
    name="answer"
    value={question.answer}
    onChange={inputChanged}
    onBlur = {handleClose}
    label="Anna arvo:"
    type="number"
    InputLabelProps={{
      shrink: true,
    }}
  />
  </div>
    )} 
}