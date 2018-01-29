<?php
header("Access-Control-Allow-Origin: *");
date_default_timezone_set('UTC');
$google = "AIzaSyBGs67lCvlT-Y5xhoO5T3FJ1_bEHpSUI5o";
$fbToken = "EAACzjZABhld8BAAaRBy1Hr5lKrEt9TsEPQZCoQBEnsf48eM2br4caga5WOToDyrL9X3nTA07YMGlLIV6Kd0o22JeZBhhrMI2ZBjaNzboRYlRuZBglSdXM847EezDUGlWLRwYkmVlI7TT86PPvB0Q3QZC2HNX9KfmcZD";

$keyword = $type = $location = $distance = "";
if(isset($_GET["id"])){
	$id = $_GET["id"];
	$str = "https://graph.facebook.com/v2.8/$id?fields=albums.limit(5){name,photos.limit(2){name,picture}},posts.limit(5){message,created_time}&access_token=$fbToken&redirect=false";
	try {
		$response = file_get_contents($str);
		echo $response;
	} catch(Facebook\Exceptions\FacebookResponseException $e) {
		echo 'Graph returned an error: ' . $e->getMessage();
		exit;
	} catch(Facebook\Exceptions\FacebookSDKException $e) {
		echo 'Facebook SDK returned an error: ' . $e->getMessage();
		exit;
	}
}else if(isset($_GET["picture"])){
	$id = $_GET["picture"];
	$str = "https://graph.facebook.com/v2.8/$id/picture?access_token=$fbToken&redirect=false";
	try {
		$response = file_get_contents($str);
		echo $response;
	} catch(Facebook\Exceptions\FacebookResponseException $e) {
		echo 'Graph returned an error: ' . $e->getMessage();
		exit;
	} catch(Facebook\Exceptions\FacebookSDKException $e) {
		echo 'Facebook SDK returned an error: ' . $e->getMessage();
		exit;
	}
}else if(isset($_GET["search"])) {
	$keyword = $_GET["search"];
	$type = $_GET["type"];
	$keyword = rawurlencode($keyword);
	$str = "https://graph.facebook.com/v2.8/search?q=$keyword&type=$type&fields=id,name,picture.width(700).height(700)&access_token=$fbToken&redirect=false&limit=10";
	if(empty($_GET["location"])) {
		$location="";
	} else {
		$location=$_GET["location"];
	}
	if($type == "place") {
		$str = "https://graph.facebook.com/v2.8/search?q=$keyword&type=$type&center=$location&fields=id,name,picture.width(700).height(700)&access_token=$fbToken&redirect=false&limit=10";
		
	}else if($type == "event") {
		$str = "https://graph.facebook.com/v2.8/search?q=$keyword&type=$type&fields=id,name,picture.width(700).height(700),place&access_token=$fbToken&redirect=false&limit=10";
	}

	try {
		$response = file_get_contents($str);
		//$response = json_decode($response,true);
		//var_dump($response);
		//$response = json_encode($response,true);
		echo $response;
		//return $response;
	} catch(Facebook\Exceptions\FacebookResponseException $e) {
		echo 'Graph returned an error: ' . $e->getMessage();
		exit;
	} catch(Facebook\Exceptions\FacebookSDKException $e) {
		echo 'Facebook SDK returned an error: ' . $e->getMessage();
		exit;
	}
}
?>