<?php
// json responder
include_once('helpers/json_response.php');
$jsonResponse = new jsonResponse();

// sql connection
include_once('helpers/mysql_connection.php');
$mySql = new mySqlConnection();

// set domain param
$domain = $mySql->escapeString($_GET['domain']);

// define financing page model and build query
include_once('models/financing_page.php');
$financingPage = new financingPage();
$financingPageSql = $financingPage->getFromOffice($domain);
// query financing page configurations and set as results
$result = $mySql->query($financingPageSql);
$result = $result[0]; // configurations is first/only row

// Check if configurations were found
if (!$result){
	// return failure if no record was returned
	$jsonResponse->errorResponse(
		array('error' => 'No financing data configured'),
		404
	);
}

// define financy policy model and build query
include_once('models/finance_policy.php');
$financePolicy = new financePolicy();
$financePolicySql = $financePolicy->getFromFinancingPage($result['id'], $result['policy_limit']);
// query finance policies and insert into new result key 'finance_policies'
$financePolicyResult = $mySql->query($financePolicySql);
$result['finance_policies'] = array_reverse($financePolicyResult ?: array());

// return json object with queried data
$jsonResponse->successResponse($result);
?>