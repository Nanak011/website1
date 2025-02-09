<?php
include 'db_connect.php';
session_start();

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $experiment_id = $_POST['experiment_id'];
    $user_id = $_SESSION['id'];

    // Retrieve experiment details from the database
    $stmt = $conn->prepare("SELECT experiment_details FROM experiments WHERE id = ? AND user_id = ?");
    $stmt->bind_param("ii", $experiment_id, $user_id);
    $stmt->execute();
    $stmt->bind_result($experiment_details);
    $stmt->fetch();
    $stmt->close();

    // Save the report details to the database
    $stmt = $conn->prepare("INSERT INTO reports (user_id, details) VALUES (?, ?)");
    if ($stmt === false) {
        die("Error: " . $conn->error);
    }
    $stmt->bind_param("is", $user_id, $experiment_details);
    if ($stmt->execute()) {
        echo "Report generated successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }
    $stmt->close();

    // Generate the report
    echo "<h2>Experiment Report</h2>";
    echo "<p>Experiment Details: $experiment_details</p>";
}

$conn->close();
?>
