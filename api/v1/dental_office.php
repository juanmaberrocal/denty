<?php
// json responder
include_once('helpers/json_response.php');
$jsonResponse = new jsonResponse();

// sql connection
include_once('helpers/mysql_connection.php');
$mySql = new mySqlConnection();

// set domain param
$domain = $mySql->escapeString($_GET['domain']);

// define home page model and build query
include_once('models/office.php');
$office = new office();
$officeSql = $office->getWithSettings($domain);
// query office and set as results
$result = $mySql->query($officeSql);
$result = $result[0]; // dental office is first/only row

// Check if office was found
if (!$result){
	// return failure if no record was returned
	$jsonResponse->errorResponse(
		array('error' => 'No office configured'),
		404
	);
}

// check if office has an address set and insert into new key 'has_address'
$result['has_address'] = ($result['contact_phone'] || $result['contact_email'] || $result['contact_address']);

// If office has social media configurations
if ($result['has_social']){
	// define social link model and build query
	include_once('models/social_link.php');
	$socialLink = new socialLink();
	$socialSql = $socialLink->getFromOffice($domain);
	// query links and insert into new result key 'socials'
	$socialResult = $mySql->query($socialSql);
	$result['socials'] = $socialResult[0] ?: array();
}

// return json object with queried data
$jsonResponse->successResponse($result);
?>