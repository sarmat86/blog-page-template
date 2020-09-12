
import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';
import Layout from '../components/Layout/Layout';
import { Alert  } from '@material-ui/lab';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";

const useStyles = makeStyles((theme) => ({
  form: {
    margin: '0 auto',
    '& .MuiFormHelperText-root': {
      textAlign: "center",
      backgroundColor: theme.palette.background.default,
      margin: 0,
      padding: '10px 0 0 0',
    },
    },
  input: {
    backgroundColor: '#fff',
  },
  alert: {
    marginBottom: 10,
  },
  recaptcha: {
    margin: '10px 0',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  recaptchaErr: {
    color: 'red',
    margin: 0,
    padding: '10px 0 0 0',
  }
}));

const Contact = () => {
  const {
    register, handleSubmit, errors, reset 
  } = useForm();
  const [btnDisabled, setBtnDisabled] = useState(false)
  const [alert, setAlert] = useState(null)
  const [recaptcha, setRecaptcha] = useState(null)
  const [recaptchaError, setRecaptchaError] = useState(false)
  const submitHandler = (formData) => {
    if(!recaptcha){
      setRecaptchaError(true);
      return false;
    }
    setRecaptchaError(false);
    setBtnDisabled(true);
    axios.post(process.env.NEXT_PUBLIC_FORM_ENDPOINT_URL, {...formData, recaptcha})
    .then((response) => {
      if(response.data.statusCode === 500 || response.data.statusCode !== 200){
        setAlert(['error', 'An error occured, try again later.'])
      }else{
        setAlert(['success', 'Message has been sent.'])
      }
      
    })
    .catch((err) => {
      setAlert(['error', 'An error occured, try again later.'])
    })
    .finally((resp)=>{
      setBtnDisabled(false);
      reset({name: '', email: '', content: '', source: ''});
      setRecaptcha(null);
      setRecaptchaError(false);
    })
  };
  const onChangeCaptcha  = (value) => {
    setRecaptcha(value);
    setRecaptchaError(false);
  }
  
  const classes = useStyles();
  return (
    <Layout>
      <h1>Contact page</h1>
      { alert ? (
      <Alert 
      severity={alert[0]}
      onClose={() => {setAlert(null)}}
      classes={{
        root: classes.alert
      }}
      >
        {alert[1]}
      </Alert> ) : null }
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              classes={{
                root: classes.input,
              }}
              id="name"
              name="name"
              label="Name"
              defaultValue=""
              variant="outlined"
              color="secondary"
              fullWidth
              autoFocus
              inputRef={register({
                required: true,
                minLength: 3,
              })}
              error={!!errors.name}
              helperText={errors.name?.type === "required" && 'Field "name" is required' || errors.name?.type === "minLength" && 'The "name" field must be at least 3 characters long'}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              classes={{
                root: classes.input,
              }}
              id="email"
              name="email"
              defaultValue=""
              label="E-mail"
              variant="outlined"
              color="secondary"
              fullWidth
              inputRef={register({
                required: true,
                pattern: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
              })}
              error={!!errors.email}
              helperText={errors.email?.type === "required" && 'Field "email" is required' || errors.email?.type === "pattern" && "The email entered is invalid"}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              classes={{
                root: classes.input,
              }}
              id="content"
              name="content"
              defaultValue=""
              label="Message"
              variant="outlined"
              color="secondary"
              fullWidth
              multiline
              rows={5}
              inputRef={register({
                required: true,
                minLength: 10,
              })}
              error={!!errors.content}
              helperText={errors.content?.type === "required" && 'Field "message" is required' || errors.content?.type === "minLength" && 'The "message" field must be at least 10 characters long'}
            />
          </Grid>
          <Grid item xs={12}>
            <div className={classes.recaptcha}>
            <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}
                onChange={onChangeCaptcha}
              />
              {recaptchaError ? (<div className={classes.recaptchaErr}>Please confirm that you are not a robot.</div>) : null}
            </div>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              disabled={btnDisabled}
              variant="contained"
              color="primary"
              fullWidth
            >
              Send!
            </Button>
          </Grid>
        </Grid>
      </form>
      
    </Layout>
  );
};

export default Contact;
