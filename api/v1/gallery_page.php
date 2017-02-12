<?php
// json responder
$jsonResponse = include_once('helpers/json_response.php');

// sql connection
$mySql = include_once('helpers/mysql_connection.php');
$domain = $mySql->escapeString($_GET['domain']);

// define gallery page model and build query
include_once('models/gallery_page.php');
$galleryPage = new galleryPage();
$galleryPageSql = $galleryPage->getFromOffice($domain, 1, array(), array('id')); // pull gallery page id
// query gallery page configurations and set as results
$result = $mySql->query($galleryPageSql);
$result = $result[0]; // configurations is first/only row

// Check if configurations were found
if (!$result){
	// return failure if no record was returned
	$jsonResponse->errorResponse(
		array('error' => 'No gallery data configured'),
		404
	);
}

// define gallery image model and build query
include_once('models/gallery_image.php');
$galleryImage = new galleryImage();
$galleryImageSql = $galleryImage->getFromGalleryPage($result['id'], $result['image_limit']);
// query gallery images and insert into new result key 'gallery_images'
$galleryImageResult = $mySql->query($galleryImageSql);
$result['gallery_images'] = array_reverse($galleryImageResult ?? array());

// return json object with queried data
$jsonResponse->successResponse($result);
?>