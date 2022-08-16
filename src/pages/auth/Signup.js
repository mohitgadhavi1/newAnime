import  React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, isLoggedin, opensigninPage } from '../../redux/features/AuthSlice';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';

function Copyright(props) {



  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Anime World
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Signup() {
 const [showPassword,setShowPassword] = useState(false)
  const [isBlurred, setIsBlurred] = useState({
    email:false,
    password:false
  })
  const [formData, setFormData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
  })

  let emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
  let passwordRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
  let emailError = isBlurred.email && (formData.email.length> 0) && !emailRegex.test(formData.email);
  //Between 8- 10 characters, at least 1 uppercase and lowercase letter,1 number and 1 special character:
// console.log(passwordRegex.test(formData.password) )



  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
   
    dispatch(addUser({
      email: data.get('email'),
      password: data.get('password'),
      firstName: data.get('firstName'),
      lasttName: data.get('lastName'),
      logedin:true,
      watchlist:[]
    }));
    dispatch(  isLoggedin("login"))
  };

  const users= useSelector((state) => state.Auth.users);
  // console.log(users)

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                value={formData.firstName}
                onChange={(e)=>{setFormData({...formData,firstName:e.target.value})}}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                value={formData.lastName}
                onChange={(e)=>{setFormData({...formData,lastName:e.target.value})}}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                value={formData.email}
                onChange={(e)=>{setFormData({...formData,email:e.target.value})}}
                  required
                //   error
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onBlur={()=>{setIsBlurred({...isBlurred,email:true})}}
                  error={emailError}
                  helperText={emailError && "Please Enter Valid E-mail address" }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                value={formData.password}
                onChange={(e)=>{setFormData({...formData,password:e.target.value})}}
                  required
                //   error
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
               
                  onBlur={()=>{setIsBlurred({...isBlurred, password:true})}}
                  error= {isBlurred.password
                     && (formData.password.length> 0) 
                     && !passwordRegex.test(formData.password) }
                  helperText= "Min 8 characters, at least 1 uppercase and lowercase letter,1 number and 1 special character"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
             
              sx={{ mt: 3, mb: 2 }}
              disabled={!formData.firstName.length>0 
                || !formData.lastName.length>0 
                || !passwordRegex.test(formData.password) 
                || !emailRegex.test(formData.email) }
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" onClick={()=>{dispatch(opensigninPage())}} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}