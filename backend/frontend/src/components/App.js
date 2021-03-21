import React, { useState, useEffect } from "react";
import { render } from "react-dom";

import Nav from "./Nav"

import "../App.css"
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
  },
  formControl: {
    minWidth: 200,
  },
  overview: {
    marginRight: theme.spacing(2),
  }
}));

const App = () => {
  const [data, setData] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [placeholder, setPlaceholder] = useState("Loading")
  const [companies, setCompanies] = useState([])
  const [open, setOpen] = useState(false)

  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const getAPI = () => {
    fetch("api/companies")
      .then(response => {
        if (response.status > 400) {
          setPlaceholder("Something went wrong!")
        }
        return response.json();
      })
      .then(data => {
        setData(data)
        setLoaded(true)
      })
      .catch(err => console.log(err));
  }

  useEffect(()=> {
    getAPI();
  }, []);

  const getCompanyInfo = company => {
    // ** make sure to check if company has been chosen already when backend's working
    setCompanies([...companies, company])
  }

  return (
    <div className="app" style={{fontFamily:"'Roboto', sans-serif"}}>
      <Nav />

      <div className="body" style={{display: "flex"}}>

        <div className="overview" style={{ backgroundColor:"white", width: "30%", height: "100vh"}}>
            <h4 style={{color:"#1d3557", paddingLeft:"40px"}}>General Overview</h4>
        </div>

        <div className="search" style={{ height: "100vh", width:"70%", backgroundColor:"#e5e5e5"}}>
          <div style={{ display:"flex", alignItems:"center" }}>
            <h1 style={{padding:"0 40px", color:"#1d3557"}}>Trends</h1>
            <div>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label" style={{color:"#1d3557"}}>Company</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  open={open}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  label="Company"
                >
                  {data.map(company => {
                    return (
                      <div key={company.company}>
                        <MenuItem onClick = {(() => (getCompanyInfo(company.company)))}>{company.company}</MenuItem>
                      </div>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="graphs" style={{padding:"0 40px", color:"#1d3557"}}>
            {
              !companies ? (
                <div />
              ) : (
                companies.map(company => (
                  <div key={company}>
                    <h4>{company}</h4>
                  </div>
                ))
              )
            }
          </div>
        </div>

      </div>

    </div>

  );
};

export default App;

const container = document.getElementById("app");
render(<App />, container);