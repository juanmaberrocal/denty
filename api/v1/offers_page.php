<?php
// json responder
$jsonResponse = include_once('helpers/json_response.php');

// sql connection
include_once('helpers/mysql_connection.php');
$mySql = new mySqlConnection();

// set domain param
$domain = $mySql->escapeString($_GET['domain']);

// define offer page model and build query
include_once('models/offer_page.php');
$offerPage = new offerPage();
$offerPageSql = $offerPage->getFromOffice($domain, 1, array(), array('id')); // pull offer page id
// query offer page configurations and set as results
$result = $mySql->query($offerPageSql);
$result = $result[0]; // configurations is first/only row

// Check if configurations were found
if (!$result){
	// return failure if no record was returned
	$jsonResponse->errorResponse(
		array('error' => 'No offer data configured'),
		404
	);
}

// define offer image model and build query
include_once('models/offer.php');
$offer = new offer();
$offerSql = $offer->getFromOfferPage($result['id'], $result['offer_limit']);
// query offer and insert into new result key 'offers'
$offerResult = $mySql->query($offerSql);
$result['offers'] = array_reverse($offerResult ?: array());

// return json object with queried data
$jsonResponse->successResponse($result);
?>