<?php
class jsonResponse {
	private static $json_header = 'Content-Type: application/json';
	private static $response_codes = array(
		200 => 'OK',
		201 => 'Created',
		202 => 'Accepted',
		204 => 'No Conetent',
		401 => 'Unauthorized',
		403 => 'Forbidden',
		404 => 'Not Found',
		500 => 'Internal Server Error',
		503 => 'Service Unavailable'
	);

	/*===============
	response builders
	===============*/
	function successResponse($data, $response_code=NULL, $response_text=NULL){
		$response_code = $response_code ?: 200;
		$response_text = $response_text ?: self::$response_codes[$response_code];

		$this->buildResponseHeader($response_code, $response_text);
		echo json_encode($data);
	}

	function errorResponse($data, $response_code=NULL, $response_text=NULL){
		$response_code = $response_code ?: 500;
		$response_text = $response_text ?: self::$response_codes[$response_code];

		$this->buildResponseHeader($response_code, $response_text);
		die(json_encode($data));
	}

	/*=============
	header builders
	=============*/
	private function buildResponseHeader($code, $text){
		header(self::$json_header);
		header("HTTP/1.1 ".$code." ".$text);
	}
}
?>