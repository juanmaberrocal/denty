<?php
// json responder
$jsonResponse = include_once('helpers/json_response.php');

// sql connection
$mySql = include_once('helpers/mysql_connection.php');

switch ($_SERVER["REQUEST_METHOD"]){
	case 'POST':
		// read post data and convert into object
		$json = file_get_contents('php://input');
		$obj = json_decode($json);

		// SQL Query
		$domain = $mySql->escapeString($obj->domain);
		$name = $mySql->escapeString($obj->name);
		$date = $mySql->escapeString(date("Y-m-d", strtotime($obj->date))); // parse date to sql accetable
		$time = $mySql->escapeString(date("H:i:s", strtotime($obj->time))); // parse time to sql accetable
		$treatment = $mySql->escapeString($obj->treatment->value);
		$phone = $mySql->escapeString($obj->phone);
		$email = $mySql->escapeString($obj->email);
		$appointmentSql = "INSERT INTO appointments (office_id, name, appointment_date, appointment_time, treatment, phone, email) VALUES ((SELECT id FROM offices WHERE domain='$domain' LIMIT 1), '$name', '$date', '$time', '$treatment', '$phone', '$email')";

		// Get insert result
		$result = $mySql->insert($appointmentSql);

		// if appointment successfully saved send out email notifications
		if ($result){
			// mailer (requires $domain to be defined)
			$mailer = include_once('helpers/appointment_mailer.php');

			// Format to human readable variables
			$prettify_name = ucwords($name);
			$prettify_date = date("m/d/y", strtotime($date));
			$prettify_time = date("h:i A", strtotime($time));
			$prettify_treatment = ucfirst($treatment);

			// build message with replacements
			$message = $mailer->buildConfirmationMessage($prettify_name, $prettify_date, $prettify_time, $prettify_treatment);

			// send email
			if ($mailer->sendAppointmentConfirmation($email, $message)){
				// store copy of successful message
				$emailQuery = "INSERT INTO message_logs (office_id, messageable_id, messageable_type, message_type, message_status, message_text, to_email) VALUES ((SELECT id FROM offices WHERE domain='$domain' LIMIT 1), '$result[id]', 'appointments', 'Appointment Confirmation', 'Success', '$message', '$email')";
				$mySql->insert($emailQuery);

				// return json object of message sent
				$jsonResponse->successResponse(
					array(
						'appointment' => $result,
						'message' => array('to' => $email, 'text' => $message)
					),
					201
				);
			} else {
				// store copy of failed message
				$emailQuery = "INSERT INTO message_logs (office_id, messageable_id, messageable_type, message_type, message_status, message_text, to_email) VALUES ((SELECT id FROM offices WHERE domain='$domain' LIMIT 1), '$result[id]', 'appointments','Appointment Confirmation', 'Fail', '$message', '$email')";
				$mySql->insert($emailQuery);

				// return warning (failure) if no message was sent
				$jsonResponse->errorResponse(
					array(
						'appointment' => $result,
						'error' => 'Pending confirmation email'
					),
					503
				);
			}
		} else {
			// return failure if no record was returned
			$jsonResponse->errorResponse(array('error' => 'Something went wrong'));
		}
		break;
	default:
		// return failure for incorrect request
		$jsonResponse->errorResponse(
			array('error' => 'Request not available'),
			400
		);
		break;
}
?>