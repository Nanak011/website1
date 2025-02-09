<?php
$conn = new mysqli('localhost', 'root', '', 'virtuallab');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
