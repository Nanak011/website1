<?php include 'session.php'; ?>
<?php include 'db_connect.php'; ?>
<!DOCTYPE html>
<html>
<head>
    <title>Tasks</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
    <header>
        <h1>Tasks</h1>
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
        <h2>Your Assigned Tasks</h2>
        <p>List of tasks assigned to you will appear here.</p>
        <?php
        $student_id = $_SESSION['id'];
        $stmt = $conn->prepare("SELECT task_details FROM tasks WHERE student_id = ?");
        $stmt->bind_param("i", $student_id);
        $stmt->execute();
        $stmt->bind_result($task_details);
        while ($stmt->fetch()) {
            echo "<p>$task_details</p>";
        }
        $stmt->close();
        ?>
    </main>
</body>
</html>
