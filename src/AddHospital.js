import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        VaccTrack
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {

  const [details, setDetails] = useState({
    type: "",
    name: "",
    contact: "",
    website: "",
    directions: "",
    longitude: "",
    latitude: "",
  });
  
  function handleChange(e) {
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    const obj = {
      type: details.type,
      name: details.name,
      contact: details.contact,
      website: details.website,
      directions: details.directions,
      longitude: parseFloat(details.longitude),
      latitude: parseFloat(details.latitude),
    };
    console.log(obj);
    console.log(typeof obj.longitude);
    axios
      .post("http://localhost:5000/hospitals/add", obj)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add a Hospital
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="type"
            label="Type of Hospital (govt or pvt)"
            name="type"
            autoComplete="none"
            autoFocus
            value={details.type}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name of Hospital"
            name="name"
            autoComplete="none"
            value={details.name}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="contact"
            label="Contact"
            name="contact"
            autoComplete="none"
            value={details.contact}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="website"
            label="Website"
            name="website"
            autoComplete="none"
            value={details.website}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="directions"
            label="Google Maps Directions Link"
            name="directions"
            autoComplete="none"
            value={details.directions}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="longitude"
            label="Longitude"
            name="longitude"
            autoComplete="none"
            value={details.longitude}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="latitude"
            label="Latitude"
            name="latitude"
            autoComplete="none"
            value={details.latitude}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Add Hospital
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}