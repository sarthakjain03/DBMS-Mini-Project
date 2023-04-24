const express = require("express");
const bodyParser = require("body-parser");
const mysql = require('mysql');
require("dotenv").config();
const app = express();
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

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

function filterStaffTable(filters) {
  let sql = 'SELECT * FROM staff';
  let filterValues = [];
  let filterCount = 0;
  for (const [key, value] of Object.entries(filters)) {
    if(value != '-1' && value != '' && value != "-1"){

      if (filterCount === 0) {
        sql += ' WHERE ';
      } else {
        sql += ' AND ';
      }
      sql += `${key} = ?`;
      filterValues.push(value);
      filterCount++;
    }
  }
  
  connection.query(sql, filterValues, (error, results, fields) => {
    if (error) throw error;
    console.log(results);
    global.staff_results = results;
    
  });
}

function filterPropTable(filters) {
  let sql = 'SELECT * FROM property';
  let filterValues = [];
  let filterCount = 0;
  for (const [key, value] of Object.entries(filters)) {
    if(value !== '-1' && value !== -1)
    {

      if(value != '-1' && value != '' && value != "-1" && key !== 'rooms' && key !== 'rent'){
  
        if (filterCount === 0) {
          sql += ' WHERE ';
        } else {
          sql += ' AND ';
        }
        sql += `${key} = ?`;
        filterValues.push(value);
        filterCount++;
      }
      else if(key === 'rooms' && value !== "" && value != '-1' && value !== -1 && value !== null){
        
        if (filterCount === 0) {
          sql += ' WHERE ';
        } else {
          sql += ' AND ';
        }
        sql += `${key} >= ?`;
        filterValues.push(value);
        filterCount++;
      }
      else if(key === 'rent' && value !== "" && value != '-1' && value !== -1 && value !== null ){
  
        if (filterCount === 0) {
          sql += ' WHERE ';
        } else {
          sql += ' AND ';
        }
        sql += `${key} <= ?`;
        filterValues.push(value);
        filterCount++;
      }
    }
  }
  
  connection.query(sql, filterValues, (error, results, fields) => {
    if (error) throw error;
    console.log(results);
    global.prop_results = results;
    
  });
}

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

app.get("/staff_listing_result",function(req,res){
      res.render("staff_listing_result",{staff_results:staff_results});
});

app.get("/prop_listing_result",function(req,res){
  res.render("prop_listing_result",{prop_results:prop_results});
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


app.post("/staff_listing", function(req,res)
{
    let filters = {
      staff_no:'-1',
      full_name:'-1',
      sex: '-1',
      branch_no:'-1',
      work_position:'-1'
    }
    const {staff_no, full_name, sex, branch_no, work_position} = req.body;
    filters.staff_no = staff_no;
    filters.full_name = full_name;
    filters.sex = sex;
    filters.branch_no = branch_no;
    filters.work_position = work_position;

   filterStaffTable(filters);
   
    filters = {
      staff_no:'-1',
      full_name:'-1',
      sex: '-1',
      branch_no:'-1',
      work_position:'-1'
    }
    
    // res.render('submit-form',{result});
    res.redirect("/staff_listing_result");
});

app.post("/prop_list", function(req,res)
{
    let filters1 = {
      property_no:'-1',
      property_type:'-1',
      rooms: -1,
      rent: -1,
      managing_staff_no:'-1',
      owner_no:'-1',
      branch_no:'-1'
    }
    const {property_no, property_type, rooms, rent, managing_staff_no, owner_no, branch_no} = req.body;
    filters1.property_no = property_no;
    filters1.property_type = property_type;
    filters1.rooms = rooms;
    filters1.rent = rent;
    filters1.managing_staff_no = managing_staff_no;
    filters1.owner_no = owner_no;
    filters1.branch_no = branch_no;

    console.log("This is filters1: ",filters1);
   filterPropTable(filters1);
   
   filters1 = {
    property_no:'-1',
    property_type:'-1',
    rooms: -1,
    rent: -1,
    managing_staff_no:'-1',
    owner_no:'-1',
    branch_no:'-1'
  }
    
    // res.render('submit-form',{result});
    res.redirect("/prop_listing_result");

});



app.listen("3000",function()
{
    console.log("The server is up on port 3000");
});

