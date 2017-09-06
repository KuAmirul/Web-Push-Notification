<!DOCTYPE html>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
<script src="https://www.gstatic.com/firebasejs/4.1.1/firebase.js"></script>

<script>
    // Initialize Firebase   
    //replace # with the correct values
    var config = {
        apiKey: "#",
        authDomain: "#",
        databaseURL: "#",
        projectId: "#",
        storageBucket: "#",
        messagingSenderId: "#"
    };
    firebase.initializeApp(config);
</script>

SILA HUBUNGI 049798494/ 049798109 untuk aduan dan sebarang bantuan. Sistem x siap lagi


<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>UnimapTest</title>
    <link rel="manifest" href="manifest.json">

    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://code.getmdl.io/1.2.1/material.indigo-pink.min.css">
    <script defer src="https://code.getmdl.io/1.2.1/material.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.99.0/css/materialize.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.99.0/js/materialize.min.js"></script>
    <!--link rel="stylesheet" href="styles/index.css"-->

    <script>
        // Function to search values in table
        function myFunction() {
            // Declare variables 
            var input, filter, table, tr, td, i;
            input = document.getElementById("myInput");
            filter = input.value.toUpperCase();
            table = document.getElementById("myTable");
            tr = table.getElementsByTagName("tr");

            // Loop through all table rows, and hide those who don't match the search query
            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[0]; //index 0 for search value in "ID penyelesai" row 
                if (td) {
                    if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }
        }
    </script>

</head>

<body>

    <header>

    </header>

    <main>
        <p>
            <!--<textarea rows="10" cols="50" id="mytext"></textarea>-->
        </p>
        <p>
            <button disabled class="js-push-btn mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
        Enable Push Messaging
      </button>
        </p>

        <!--<a class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">add</i></a>-->

        <section class="subscription-details js-subscription-details is-invisible">
            <pre><code class="js-subscription-json"></code></pre>
        </section>
    </main>

    <script src="main.js"></script>

    <script src="https://code.getmdl.io/1.2.1/material.min.js"></script>



    <%
response.write("<h3>Test</h3>")

Dim strDBDesc
' replace # with the respective values
' strDBDesc can be obtained from tnsnames.ora
strDBDesc = "(DESCRIPTION=(LOAD_BALANCE=YES)(FAILOVER=ON)(ADDRESS=(PROTOCOL=TCP)(HOST=#)(PORT=1521))(ADDRESS=(PROTOCOL=TCP)(HOST=#)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=#)));"

'replace ####### with the correct values
Dim strUserID: strUserID = "#"
Dim strPassword: strPassword = "#"

Dim strConnection
strConnection = "Provider=OraOLEDB.Oracle;Data Source=" & strDBDesc & _
                "User ID=" & strUserID & ";Password=" & strPassword & ";"

Dim ADODBConnection
Set ADODBConnection = Server.CreateObject("ADODB.Connection")
ADODBConnection.Open strConnection

Dim strSQL
strSQL = "SELECT id_penyelesai, detail_lokasi, catatan1, no_aduan, nama  FROM hd_laporan_pengguna WHERE status_push is null"
'strSQL = "SELECT detail_lokasi, catatan1, id_penyelesai FROM hd_laporan_pengguna WHERE id IN (27,19)"

Dim cn, rs, cmd, param
Set rs = Server.CreateObject("ADODB.Recordset")
rs.Open strSQL, ADODBConnection

%>
        <input type="text" id="myInput" onkeyup="myFunction()" placeholder="Enter name..">

        <table id="myTable">
            <tr class="header">
                <th style="width:10%;">ID Penyelesai</th>
                <th style="width:20%;">Lokasi</th>
                <th style="width:30%;">Laporan</th>
                <th style="width:20%;">No Aduan</th>
                <th style="width:20%;">Nama</th>
            </tr>

            <%
			' Response.Write ("<TR bgcolor=White>")
			'for each x in rs.fields
			'  response.write("<TD>" & x.name & "</TD>")
			'next
			' Response.Write ("</TR>")
			 Do until rs.EOF
			 for each x in rs.fields
			  response.write("<TD>" & x.value & "</TD>")
			next
			rs.MoveNext
			Response.Write ("<TR>")
			loop


			ADODBConnection.Close
			%>

        </table>
</body>

</html>




<%
if Request.servervariables("server_name") = "icthelpdesk.unimap.edu.my" then
	response.redirect ("http://icthelpdesk.unimap.edu.my/helpdesk/")
end if
%>
