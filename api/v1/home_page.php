<?php
// json responder
$jsonResponse = include_once('helpers/json_response.php');

// sql connection
$mySql = include_once('helpers/mysql_connection.php');
$domain = $mySql->escapeString($_GET['domain']);

// define home page model and build query
include_once('models/home_page.php');
$homePage = new homePage();
$homePageSql = $homePage->getFromOffice($domain, 1, array(), array('id')); // pull home page id
// query home page configurations and set as results
$result = $mySql->query($homePageSql);
$result = $result[0]; // configurations is first/only row

// Check if configurations were found
if (!$result){
	// return failure if no record was returned
	$jsonResponse->errorResponse(
		array('error' => 'No home data configured'),
		404
	);
}

// If home page has carousel
if ($result['has_carousel']){
	// define carousel model and build query
	include_once('models/home_page_carousel.php');
	$carousel = new homePageCarousel();
	$carouselSql = $carousel->getFromHomePage($result['id'], $result['carousel_limit']);
	// query carousel images and insert into new result key 'carousel'
	$carouselResult = $mySql->query($carouselSql);
	$result['carousel'] = array_reverse($carouselResult ?: array());
}

// If home page has description
if ($result['has_description']){
	// define description model and build query
	include_once('models/home_page_description.php');
	$description = new homePageDescription();
	$descriptionSql = $description->getFromHomePage($result['id'], $result['description_limit']);
	// query description text and insert into new result key 'description'
	$descriptionResult = $mySql->query($descriptionSql);
	$result['descriptions'] = array_reverse($descriptionResult ?: array());
}

// If home page has highlights
if ($result['has_highlights']){
	// define highlight model and build query
	include_once('models/home_page_highlight.php');
	$highlight = new homePageHighlight();
	$highlightSql = $highlight->getFromHomePage($result['id'], $result['highlight_limit']);
	// query highlights and insert into new result key 'highlights'
	$highlightResult = $mySql->query($highlightSql);
	$result['highlights'] = array_reverse($highlightResult ?: array());
}

// If home page has promotions
if ($result['has_promotions']){
	// check if promotions should be loaded from general offers
	if ($result['promotions_from_offers']){
		// load home page specific promotions if not using general offers
		include_once('models/offer.php');
		$promotion = new offer();
		$promotionSql = $promotion->getFromOffice($domain, $result['promotion_limit']);
	} else {
		// load home page specific promotions if not using general offers
		include_once('models/home_page_promotion.php');
		$promotion = new homePagePromotion();
		$promotionSql = $promotion->getFromHomePage($result['id'], $result['promotion_limit']);
	}

	// query promotions and insert into new result key 'promotions'
	$promotionResult = $mySql->query($promotionSql);
	$result['promotions'] = array_reverse($promotionResult ?: array());
}

// If home page has carousel
if ($result['has_thumbnails']){
	// check if thumbnials should be loaded from general gallery
	if ($result['thumbnails_from_gallery']){
		// load office gallery images
		include_once('models/gallery_image.php');
		$thumbnail = new galleryImage();
		$thumbnailSql = $thumbnail->getFromOffice($domain, $result['thumbnail_limit']);
	} else {
		// load home page specific thumbnails if not using general gallery
		include_once('models/home_page_thumbnail.php');
		$thumbnail = new homePageThumbnail();
		$thumbnailSql = $thumbnail->getFromHomePage($result['id'], $result['thumbnail_limit']);
	}

	// query thumbnails images and insert into new result key 'thumbnails'
	$thumbnailResult = $mySql->query($thumbnailSql);
	$result['thumbnails'] = array_reverse($thumbnailResult ?: array());
}

// return json object with queried data
$jsonResponse->successResponse($result);
?>