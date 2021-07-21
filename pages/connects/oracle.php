<?php
$conn = oci_connect('system', 'MBAmissah1231', 'localhost/XE');
if( $conn ) {
echo "Connected to Oracle successfully.<br />";
} else {
echo "Failed to connect to Oracle:<br />";
}
?>