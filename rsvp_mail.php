<?php
header('Content-Type: application/json');

// Helper to sanitize input
function sanitize($data) {
    return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
}

// Get POST data
$name       = isset($_POST['name']) ? sanitize($_POST['name']) : '';
$guests     = isset($_POST['guests']) ? sanitize($_POST['guests']) : '';
$attendance = isset($_POST['attendance']) ? sanitize($_POST['attendance']) : '';
$notes      = isset($_POST['notes']) ? sanitize($_POST['notes']) : '';

// Validate required fields
if ($name === '' || $guests === '' || $attendance === '') {
    echo json_encode([
        'success' => false,
        'error'   => 'Faltan campos obligatorios (nombre, número de invitados o confirmación).'
    ]);
    exit;
}

// Email configuration
$to      = 'oscarxxi@gmail.com, karolrueda18@gmail.com'; // <-- Cambia si es necesario
$subject = '🎉 Nueva confirmación de asistencia (RSVP)';

$attendanceText = $attendance === 'yes' ? 'Sí' : 'No';
$message = <<<EOD
Has recibido una nueva confirmación de asistencia a tu evento:

👤 Nombre: $name
👥 Número de invitados: $guests
📅 Asistencia: {$attendanceText}
📝 Notas adicionales: $notes

Saludos,
Formulario RSVP
EOD;

// Headers
$headers = "From: RSVP <no-reply@tuboda.com>\r\n";
$headers .= "Reply-To: no-reply@tuboda.com\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send the email
if (mail($to, $subject, $message, $headers)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode([
        'success' => false,
        'error'   => 'Ocurrió un error al enviar el correo. Intenta nuevamente más tarde.'
    ]);
} 