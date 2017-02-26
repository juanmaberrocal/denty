<?php
class appointmentMailer {
	private static $default_subject = array(
		'appointment_confirm' => 'Appointment Confirmation',
		'appointment_reminder' => 'Appointment Reminder',
		'appointment_cancelled' => 'Appointment Cancelled'
	);
	private static $message_footer = "\n\n\n".
		"Sent via Denty";

	var $office_data;

	// on new mailer, query domain office configurations
	function __construct($domain){
		include_once('mysql_connection.php');
		$mySql = new mySqlConnection();

		$domain = $mySql->escapeString($domain);
		$emailSql = "SELECT name, domain, contact_email, contact_phone, contact_address FROM offices WHERE domain = '$domain' LIMIT 1";
		$result = $mySql->query($emailSql);

		// if office found set data
		if ($result){			
			$this->office_data = $result[0];
		} else {
			// if no office configured send back error
			header('Content-Type: application/json');
			header('HTTP/1.1 404 Internal Server Error');
			die(json_encode(array('error' => 'Office not found')));
		}
	}

	/*==========
	mail senders
	==========*/
	function sendAppointmentConfirmation($to, $message){
		$subject = self::$default_subject['appointment_confirm'];
		$headers = $this->buildHeader();

		return mail($to, $subject, $message, $headers);
	}

	/*==============
	message builders
	==============*/
	function buildConfirmationMessage($name, $date, $time, $treatment){
		// get confirmation message template
		$message_template = include('mail_templates/appointment_confirm.php');

		// replacements
		$search = array(
			# "to" info
			'$to', '$date', '$time', '$treatment',
			# "from" info
			'$from', '$email', '$phone', '$address');
		$replace = array(
			# "to" data
			$name, $date, $time, $treatment,
			# "from" data
			$this->office_data['name'], $this->office_data['contact_email'], $this->office_data['contact_phone'], $this->office_data['contact_address']
		);

		// replace variables
		$message = str_replace($search, $replace, $message_template);

		// return wrapped message with footer
		return wordwrap($message.self::$message_footer);
	}

	/*=============
	header builders
	=============*/
	private function buildHeader(){
		$headers = "From: \"".$this->office_data['name']."\" <appointments@denty.com>"."\r\n".
			"Bcc: ".$this->office_data['contact_email']."\r\n".
			"Reply-To: ".$this->office_data['contact_email']."\r\n".
			"X-Mailer: PHP/".phpversion();

		return $headers;
	}
}
?>