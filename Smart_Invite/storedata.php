<?php
$servername = "localhost";
$username = "root"; // change if needed
$password = "";     // change if needed
$dbname = "invitation_app";

// Connect to DB
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Debug: check incoming POST
// print_r($_POST);

// Map JS keys to DB variables (falling back to defaults if missing)
$eventType     = $_POST['eventType'] ?? '';
$eventTitle    = $_POST['title'] ?? '';  // Mapped from 'title'
$birthdayAge   = $_POST['birthdayAge'] ?? null;
$birthdayName  = $_POST['birthdayName'] ?? null;
$brideName     = $_POST['brideName'] ?? null;
$groomName     = $_POST['groomName'] ?? null;
$companyName   = $_POST['companyName'] ?? null;
$meetingType   = $_POST['meetingType'] ?? null;
$eventDate     = $_POST['date'] ?? '';   // Mapped from 'date'
$eventTime     = $_POST['time'] ?? '';   // Mapped from 'time'
$eventLocation = $_POST['location'] ?? '';// Mapped from 'location'
$hostName      = $_POST['host'] ?? '';   // Mapped from 'host'
$eventMessage  = $_POST['message'] ?? ''; // Mapped from 'message'
$theme         = $_POST['theme'] ?? 'modern';

// Prepare insert
$sql = "INSERT INTO invitations (
    event_type, event_title, birthday_age, birthday_name,
    bride_name, groom_name, company_name, meeting_type,
    event_date, event_time, event_location, host_name,
    event_message, theme
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    die("Prepare failed: " . $conn->error);
}

// Bind parameters (all as strings except birthday_age as integer)
$stmt->bind_param(
    "ssisssssssssss",
    $eventType,
    $eventTitle,
    $birthdayAge,
    $birthdayName,
    $brideName,
    $groomName,
    $companyName,
    $meetingType,
    $eventDate,
    $eventTime,
    $eventLocation,
    $hostName,
    $eventMessage,
    $theme
);

// Execute and check
if ($stmt->execute()) {
    echo "Saved successfully";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
