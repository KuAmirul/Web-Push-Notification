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

    <script defer src="https://code.getmdl.io/1.2.1/material.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.99.0/js/materialize.min.js"></script>
    
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://code.getmdl.io/1.2.1/material.indigo-pink.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.99.0/css/materialize.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

</head>

<body>

    <header>

    </header>

    <main>
        <p>
            <button disabled class="js-push-btn mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
        Enable Push Messaging
      </button>
        </p>

        <!--<a class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">add</i></a>-->

        <section class="subscription-details js-subscription-details is-invisible">
            <pre><code class="js-subscription-json"></code></pre>
		<!-- style="display:none" to hide textbox -->
        </section>
    </main>

    <script src="https://code.getmdl.io/1.2.1/material.min.js"></script>

<%

Dim strDBDesc
' replace # with the respective values
' strDBDesc can be obtained from tnsnames.ora
strDBDesc = "(DESCRIPTION=(LOAD_BALANCE=YES)(FAILOVER=ON)(ADDRESS=(PROTOCOL=TCP)(HOST=#)(PORT=1521))(ADDRESS=(PROTOCOL=TCP)(HOST=#)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=#)));"

'replace # with the correct values
Dim strUserID: strUserID = "#"
Dim strPassword: strPassword = "#"

Dim strConnection
strConnection = "Provider=OraOLEDB.Oracle;Data Source=" & strDBDesc & _
                "User ID=" & strUserID & ";Password=" & strPassword & ";"

Dim ADODBConnection
Set ADODBConnection = Server.CreateObject("ADODB.Connection")
ADODBConnection.Open strConnection

Dim param: param = Request.QueryString("n")  'obtain querystring
Dim strSQL
strSQL = "SELECT id_penyelesai,tarikh, catatan1, lokasi_kerosakan, detail_lokasi, nama , no_tel, emelpengguna, jabatanid  FROM hd_laporan_pengguna WHERE no_aduan LIKE'" & param & "%'"

Dim cn, rs, cmd
Set rs = Server.CreateObject("ADODB.Recordset")
rs.Open strSQL, ADODBConnection

%>

<table class="table">
    <tbody>
        <tr>
          <th>ID Penyelesai</th>
            <td>
			<%if param = "" Then
				response.write("")				
				Else
				response.write(rs.fields(0).value)				
				End If
			%>		
			</td>
        </tr>
        <tr>
          <th>Tarikh Laporan</th>
            <td>
			<%if param = "" Then
				response.write("")			
				Else
				response.write(rs.fields(1).value)				
				End If
			%>	
			</td>
        </tr>
        <tr>
          <th>Laporan</th>
            <td>
			<%if param = "" Then
				response.write("")				
				Else
				response.write(rs.fields(2).value)				
				End If
			%>	
			</td>
        </tr>
        <tr>
          <th>Lokasi Kerosakan</th>
            <td>
			<%if param = "" Then
				response.write("")				
				Else
				response.write(rs.fields(3).value &"</br>"&rs.fields(4).value)	
				End If
			%>	
			</td>
        </tr>
		<tr>
          <th>Nama Pengguna</th>
            <td>
			<%if param = "" Then
				response.write("")				
				Else
				response.write(rs.fields(5).value)				
				End If
			%>	
			</td>
        </tr>
		<tr>
          <th>No Tel. Pengguna</th>
            <td>
			<%if param = "" Then
				response.write("")				
				Else
				response.write(rs.fields(6).value)				
				End If
			%>	
			</td>
        </tr>
		<tr>
          <th>Emel Pengguna</th>
            <td>
			<%if param = "" Then
				response.write("")				
				Else
				response.write(rs.fields(7).value)				
				End If
			%>	
			</td>
        </tr>
				<tr>
          <th>Jabatan</th>
            <td>
			<%if param = "" Then
				response.write("")				
				Else
				response.write(rs.fields(8).value)				
				End If
			%>	
			</td>
        </tr>
    </tbody>
	<%ADODBConnection.Close%>
</table>
	
<script src="main.js"></script>
	
</body>

</html>




<%
if Request.servervariables("server_name") = "icthelpdesk.unimap.edu.my" then
	response.redirect ("http://icthelpdesk.unimap.edu.my/helpdesk/")
end if
%>
