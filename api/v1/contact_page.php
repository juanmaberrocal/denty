<?php
// json responder
include_once('helpers/json_response.php');
$jsonResponse = new jsonResponse();

// sql connection
include_once('helpers/mysql_connection.php');
$mySql = new mySqlConnection();

// set domain param
$domain = $mySql->escapeString($_GET['domain']);

// define contact page model and build query
include_once('models/contact_page.php');
$contactPage = new contactPage();
$contactPageSql = $contactPage->getFromOffice($domain);
// query contact page configurations and set as results
$result = $mySql->query($contactPageSql);
$result = $result[0]; // configurations is first/only row

// Check if configurations were found
if (!$result){
	// return failure if no record was returned
	$jsonResponse->errorResponse(
		array('error' => 'No contact data configured'),
		404
	);
}

// return json object with queried data
$jsonResponse->successResponse($result);
?>