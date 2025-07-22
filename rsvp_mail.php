<?php
header('Content-Type: application/json');

// Get POST data safely
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$guests = isset($_POST['guests']) ? trim($_POST['guests']) : '';
$attendance = isset($_POST['attendance']) ? trim($_POST['attendance']) : '';
$notes = isset($_POST['notes']) ? trim($_POST['notes']) : '';

// Validate required fields
if ($name === '' || $guests === '' || $attendance === '') {
    echo json_encode(['success' => false, 'error' => 'Campos requeridos faltantes.']);
    exit;
}

// Email settings
$to = 'oscarxxi@gmail.com, karolrueda18@gmail.com'; // <-- Cambia esto por tu correo real
$subject = 'Nueva confirmación de asistencia (RSVP)';
$message = "Nombre: $name\n" .
           "Número de invitados: $guests\n" .
           "Asistirá: " . ($attendance === 'yes' ? 'Sí' : 'No') . "\n" .
           "Notas: $notes\n";
$headers = 'From: RSVP <no-reply@tuboda.com>' . "\r\n" .
           'Reply-To: no-reply@tuboda.com' . "\r\n" .
           'X-Mailer: PHP/' . phpversion();

// Send email
if (mail($to, $subject, $message, $headers)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => 'No se pudo enviar el correo.']);
} 