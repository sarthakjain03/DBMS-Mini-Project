const express = require("express");
const bodyParser = require("body-parser");
const mysql = require('mysql');
require("dotenv").config();
const app = express();
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view  engine","ejs");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASS,
    database: 'dreamhome'
  });
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

app.get("/", function(req,res)
{
  res.sendFile(__dirname+"/homepage.html");   
});

app.get("/client_reg",function(req, res)
{
    res.sendFile(__dirname+"/client_reg.html");
});

app.get("/lease_form",function(req, res)
{
    res.sendFile(__dirname+"/lease_form.html");
});

app.get("/owner_reg",function(req, res)
{
    res.sendFile(__dirname+"/owner_reg.html");
});

app.get("/prop_list",function(req, res)
{
    res.sendFile(__dirname+"/prop_list.html");
});

app.get("/prop_reg",function(req, res)
{
    res.sendFile(__dirname+"/prop_reg.html");
});

app.get("/prop_report",function(req, res)
{
    res.sendFile(__dirname+"/prop_report.html");
});

app.get("/staff_listing",function(req, res)
{
    res.sendFile(__dirname+"/staff_listing.html");
});

app.get("/staff_reg",function(req, res)
{
    res.sendFile(__dirname+"/staff_reg.html");
});




app.post("/client_reg", function(req, res)
{
    
    const { clientnum, clientname, telenum, type, maxrent, branchnum, registrar, regdate} = req.body;
    connection.query('INSERT INTO property_client(client_no, full_name, branch_no, staff_no, reg_date, property_type, max_rent, telephone_no) values ("'+ clientnum +'","'+clientname+'","'+branchnum+'","'+registrar+'","'+regdate+'","'+type+'","'+maxrent+'","'+telenum+'");', (error, results, fields) => {
        if (error) throw error;
        else{
          console.log('Data added');
          const alertMessage = 'Client Registration Successful!';
          res.send(`<script>alert("${alertMessage}"); window.location.href="/";</script>`);
        }
      });
});

app.post("/owner_reg", function(req, res)
{
    
    const { ownerNum, ownerName, otype, oadd, otele} = req.body;
    connection.query('INSERT INTO property_owner(owner_no, owner_type, full_name, owner_address, telephone_no) values ("'+ ownerNum +'","'+otype+'","'+ownerName+'","'+oadd+'","'+otele+'");', (error, results, fields) => {
        if (error) throw error;
        else{
          console.log('Data added');
          const alertMessage = 'Owner Registration Successful!';
          res.send(`<script>alert("${alertMessage}"); window.location.href="/";</script>`);
          
        }
      });
});

app.post("/staff_reg", function(req, res)
{
    
    const { staffnum, staffname, staffsex, dob, position, branchnum,startdate,bonus,supernum} = req.body;
    connection.query('INSERT INTO staff(staff_no, full_name, sex, dob, branch_no, super_staff_no, work_position, start_date,bonus) values ("'+ staffnum +'","'+staffname+'","'+staffsex+'","'+dob+'","'+branchnum+'","'+supernum+'","'+position+'","'+startdate+'","'+bonus+'");', (error, results, fields) => {
        if (error) throw error;
        else{
          console.log('Data added');
          const alertMessage = 'Staff Registration Successful!';
          res.send(`<script>alert("${alertMessage}"); window.location.href="/";</script>`);
        }
      });
});


app.post("/prop_reg", function(req, res)
{
    
    const { propnum, type, room, rent, address, managestaff,ownernum,branchnum} = req.body;
    connection.query('INSERT INTO property(property_no, property_type, rooms, rent, property_address, managing_staff_no, owner_no, branch_no) values ("'+ propnum +'","'+type+'","'+room+'","'+rent+'","'+address+'","'+managestaff+'","'+ownernum+'","'+branchnum+'");', (error, results, fields) => {
        if (error) throw error;
        else{
          console.log('Data added');
          const alertMessage = 'Property Registration Successful!';
          res.send(`<script>alert("${alertMessage}"); window.location.href="/";</script>`);
        }
      });
});

app.post("/lease_form", function(req, res)
{
    
    const { lnum, cnum, pnum, paymentmethod, deposit, rentStart,rentFinish} = req.body;
    connection.query('INSERT INTO lease(lease_no, client_no, property_no, payment_method, deposit_paid, rent_start, rent_finish) values ("'+ lnum +'","'+cnum+'","'+pnum+'","'+paymentmethod+'","'+deposit+'","'+rentStart+'","'+rentFinish+'");', (error, results, fields) => {
        if (error) throw error;
        else{
          console.log('Data added');
          const alertMessage = 'Lease Form Registration Successful!';
          res.send(`<script>alert("${alertMessage}"); window.location.href="/";</script>`);
        }
      });
});



app.listen("3000",function()
{
    console.log("The server is up on port 3000");
});

