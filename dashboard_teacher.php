<?php include 'session.php'; ?>
<!DOCTYPE html>
<html>
<head>
    <title>Teacher Dashboard</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
    <header>
        <h1>Welcome, Teacher <?php echo $_SESSION['fname'] . ' ' . $_SESSION['lname']; ?></h1>
    </header>
    <nav>
        <ul>
            <li><a href="experiments/physics.html">Physics Experiments</a></li>
            <li><a href="experiments/chemistry.html">Chemistry Experiments</a></li>
            <li><a href="experiments/biology.html">Biology Experiments</a></li>
            <li><a href="experiments/mathematics.html">Mathematics Experiments</a></li>
            <li><a href="history.php">History</a></li>
            <li><a href="tasks.php">Tasks</a></li>
            <li><a href="assign_task.php">Assign Task</a></li>
            <li><a href="report.php">Generate Report</a></li>
        </ul>
    </nav>
    <main>
        <h2>Teacher Dashboard</h2>
        <p>Here you can access all the functionalities available to teachers.</p>
        <div>
            <button onclick="window.location.href='experiments/physics.html'">Physics Experiments</button>
            <button onclick="window.location.href='experiments/chemistry.html'">Chemistry Experiments</button>
            <button onclick="window.location.href='experiments/biology.html'">Biology Experiments</button>
            <button onclick="window.location.href='experiments/mathematics.html'">Mathematics Experiments</button>
            <button onclick="window.location.href='history.php'">History</button>
            <button onclick="window.location.href='tasks.php'">Tasks</button>
            <button onclick="window.location.href='assign_task.php'">Assign Task</button>
            <button onclick="window.location.href='report.php'">Generate Report</button>
        </div>
    </main>
</body>
</html>
