import React, {useState} from 'react';
import Header from './components/Header'
import Form from './components/Form'
import Grid from './components/Grid'


function App() {

  const [type, setType] = useState("");

  return (
    <>
      <Header />
      <Form setType={setType} />
      <Grid type={type}/>
    </>
  );
}

export default App;
