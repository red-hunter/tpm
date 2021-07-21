<?php
$conn = new SQLite3('Project2_sqlite.sqlite');
if( $conn ) {
echo "Connected to SQLite successfully.<br />";
} else {
echo "Failed to connect to SQLite:<br />";
}
?>
