<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'session.php';
include 'db_connect.php';
?>

<!DOCTYPE html>
<html>
<head>
    <title>History</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
    <header>
        <h1>Experiment History</h1>
    </header>
    <nav>
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="dashboard_student.php">Dashboard</a></li>
            <li><a href="experiments/physics.html">Physics Experiments</a></li>
            <li><a href="experiments/chemistry.html">Chemistry Experiments</a></li>
            <li><a href="experiments/biology.html">Biology Experiments</a></li>
            <li><a href="experiments/mathematics.html">Mathematics Experiments</a></li>
            <li><a href="history.php">History</a></li>
            <li><a href="tasks.php">Tasks</a></li>
            <li><a href="report.php">Generate Report</a></li>
        </ul>
    </nav>
    <main>
        <h2>Experiment History</h2>
        <p>List of all the experiments you have conducted will appear here.</p>
        <?php
        $user_id = $_SESSION['id'];
        echo "<p>Debug: User ID - $user_id</p>";

        $stmt = $conn->prepare("SELECT experiment_details, experiment_date FROM experiments WHERE user_id = ?");
        if ($stmt === false) {
            die("Error: " . $conn->error);
        }
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $stmt->bind_result($details, $date);

        $count = 0;
        while ($stmt->fetch()) {
            echo "<p>Date: $date<br>Details: $details</p>";
            $count++;
        }
        if ($count == 0) {
            echo "<p>No experiment history found.</p>";
        }
        $stmt->close();
        $conn->close();
        ?>
    </main>
</body>
</html>
