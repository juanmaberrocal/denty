<?php
// json responder
include_once('helpers/json_response.php');
$jsonResponse = new jsonResponse();

// sql connection
include_once('helpers/mysql_connection.php');
$mySql = new mySqlConnection();

// set domain param
$domain = $mySql->escapeString($_GET['domain']);

// define service page model and build query
include_once('models/services_page.php');
$servicesPage = new servicesPage();
$servicePageSql = $servicesPage->getFromOffice($domain, 1, array(), array('id')); // pull service page id
// query service page configurations and set as results
$result = $mySql->query($servicePageSql);
$result = $result[0]; // configurations is first/only row

// Check if configurations were found
if (!$result){
	// return failure if no record was returned
	$jsonResponse->errorResponse(
		array('error' => 'No service data configured'),
		404
	);
}

// define service image model and build query
include_once('models/service.php');
$service = new service();
$serviceSql = $service->getFromServicesPage($result['id'], $result['services_limit']);
// query service and insert into new result key 'services'
$serviceResult = $mySql->query($serviceSql);
$result['services'] = array_reverse($serviceResult ?: array());

// return json object with queried data
$jsonResponse->successResponse($result);
?>