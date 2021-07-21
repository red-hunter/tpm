<?php
// Connecting to mysql database
$conn = new mysqli("localhost", "root", "awal1678", "Project2_mysql");
// Check for database connection error
if (mysqli_connect_errno()) {
echo( "Failed to connect to MySQL: " . mysqli_connect_error() );
} else {
echo "Connected to mysql successfully";
$conn->close();
}
?>