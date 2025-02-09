<?php include 'session.php'; ?>
<?php include 'db_connect.php'; ?>
<!DOCTYPE html>
<html>
<head>
    <title>Assign Task</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
    <header>
        <h1>Assign Task</h1>
    </header>
    <nav>
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="dashboard_teacher.php">Dashboard</a></li>
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
        <h2>Assign a Task to Student</h2>
        <form method="post" action="assign_task.php">
            <label>Student ID:</label>
            <input type="number" name="student_id" required><br>
            <label>Task Details:</label>
            <textarea name="task_details" required></textarea><br>
            <button type="submit">Assign Task</button>
        </form>
    </main>
</body>
</html>
<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $student_id = $_POST['student_id'];
    $task_details = $_POST['task_details'];

    $stmt = $conn->prepare("INSERT INTO tasks (student_id, task_details) VALUES (?, ?)");
    $stmt->bind_param("is", $student_id, $task_details);
    if ($stmt->execute()) {
        echo "Task assigned successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }
    $stmt->close();
}
$conn->close();
?>
