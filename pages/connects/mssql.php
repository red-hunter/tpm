<?php
$serverName = 'localhost\sqlexpress'; //serverName\instanceName
// Since UID and PWD are not specified in the $connectionInfo array,
// The connection will be attempted using Windows Authentication.
$connectionInfo = array( "Database"=>"Project2_microsoftsqlserver" );
$conn = sqlsrv_connect( $serverName, $connectionInfo);
if( $conn ) {
echo "Connected to Microsoft SQL Server successfully.<br />";
} else {
echo "Failed to connect to Microsoft SQL Server:<br />";
die( print_r( sqlsrv_errors(), true));
}
?>