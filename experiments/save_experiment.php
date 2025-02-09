<?php
include 'db_connect.php';
session_start();

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $experiment_details = $_POST['experiment_details'];
    $user_id = $_SESSION['id'];

    // Debugging statements to check captured data
    echo "<p>Debug: User ID - $user_id</p>";
    echo "<p>Debug: Experiment Details - $experiment_details</p>";

    // Save the experiment details to the database
    $stmt = $conn->prepare("INSERT INTO experiments (user_id, experiment_details) VALUES (?, ?)");
    if ($stmt === false) {
        die("Error: " . $conn->error);
    }
    $stmt->bind_param("is", $user_id, $experiment_details);
    if ($stmt->execute()) {
        echo "Experiment saved successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }
    $stmt->close();
}

$conn->close();
?>
