import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Snackbar from '@material-ui/core/Snackbar';
import Answer from './Answer';
import { red } from '@material-ui/core/colors';

export default function Questionlist() {
  const [questions, setQuestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');

  let url = "https://cors-anywhere.herokuapp.com/"
  
  useEffect(() => {
    getQuestions();
  }, [])

  const getQuestions = () => {
    fetch(url + 'https://questionnaire-rest.herokuapp.com/api/questions')
    .then(response => response.json())
    .then(data => setQuestions(data._embedded.questions))
    .catch(err => console.error(err))
  }

  const saveQuestion = (question) => {
    fetch(url + 'https://questionnaire-rest.herokuapp.com/api/answers', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(question)
    })
    .then(res => getQuestions())
    .catch(err => console.error(err))
}

  const updateQuestion = (link, question) => {
    fetch(url + link, {
      method: 'PUT',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(question)
    })
    .then(_ => getQuestions())
    .then(_ => {
      setMsg('Vastaus tallennettu');
      setOpen(true);
    })
    .catch(err => console.error(err))  
  }

  const handleClose = () => {
    setOpen(false);
  }

  const columns = [
        
    {
      Header: 'Kysymys',
      accessor: 'qst',
      sortable:false,
      filterable:false,
      style:{
        background: red
      }
    },
    {
      Cell: row => (<Answer question={row.original} saveQuestion={saveQuestion} updateQuestion={updateQuestion} />)
    }
  ]

  return(
    <div>
      <ReactTable 
        data={questions} columns={columns} defaultPageSize={10}/>
      <Snackbar open={open} autoHideDuration={1000} 
        onClose={handleClose} message={msg} />
    </div>
  )
}