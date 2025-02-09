<?php include 'session.php'; ?>
<?php include 'db_connect.php'; ?>

<!DOCTYPE html>
<html>
<head>
    <title>Generate Report</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
    <header>
        <h1>Generate Report</h1>
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
        <h2>Generate Report</h2>
        <form method="post" action="generate_report.php">
            <label>Select Experiment:</label>
            <select name="experiment_id" required>
                <?php
                $user_id = $_SESSION['id'];
                $stmt = $conn->prepare("SELECT id, experiment_details FROM experiments WHERE user_id = ?");
                $stmt->bind_param("i", $user_id);
                $stmt->execute();
                $stmt->bind_result($id, $details);
                while ($stmt->fetch()) {
                    echo "<option value=\"$id\">$details</option>";
                }
                $stmt->close();
                ?>
            </select><br>
            <button type="submit">Generate Report</button>
        </form>
    </main>
</body>
</html>
