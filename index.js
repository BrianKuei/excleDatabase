const express = require('express');

const {google} = require('googleapis');


const app = express();


app.get('/',async (req,res)=>{

  const auth = new google.auth.GoogleAuth({
    keyFile:"credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
  });

  const client = await auth.getClient();

  const googleSheets = google.sheets({version:"v4", auth:client});

  const spreadsheetId = "1NrOnicyFayGsMx6ZnttgWcseYz_nmq1CMIJLKRPe5kg";

  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId
  })


  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "工作表1!A:A"
  });

  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "工作表1!A:B",
    valueInputOption: "USER_ENTERED",
    resource:{
      values:[
        ["大木博士","092737182","jj333"]
      ]
    }
  })

  res.send(getRows.data);
})

app.listen(1337,(req,res)=>console.log('running on 1337'));