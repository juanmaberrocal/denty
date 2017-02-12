<?php
// json responder
$jsonResponse = include_once('helpers/json_response.php');

// sql connection
$mySql = include_once('helpers/mysql_connection.php');
$domain = $mySql->escapeString($_GET['domain']);

// define about page model and build query
include_once('models/about_page.php');
$aboutPage = new aboutPage();
$aboutPageSql = $aboutPage->getFromOffice($domain, 1, array(), array('id')); // pull about page id
// query about page configurations and set as results
$result = $mySql->query($aboutPageSql);
$result = $result[0]; // configurations is first/only row

// Check if configurations were found
if (!$result){
	// return failure if no record was returned
	$jsonResponse->errorResponse(
		array('error' => 'No about data configured'),
		404
	);
}

// define about image model and build query
include_once('models/about.php');
$about = new about();
$aboutSql = $about->getFromAboutPage($result['id'], $result['about_limit']);
// query about and insert into new result key 'abouts'
$aboutResult = $mySql->query($aboutSql);
$result['abouts'] = array_reverse($aboutResult ?? array());

// return json object with queried data
$jsonResponse->successResponse($result);
?>