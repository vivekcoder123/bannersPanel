<?php  

date_default_timezone_set("Asia/Kolkata");

$host="localhost";
$username="root";
$password="";
$database="banners";

$connection=mysqli_connect($host,$username,$password,$database);

if(!$connection){
	die("mysqli error ".mysqli_error($connection));
}

function escape($string){
	return mysqli_real_escape_string($GLOBALS['connection'],trim($string));
}

function query($query){
	return mysqli_query($GLOBALS['connection'],$query);
}

function confirm($result){
	if(!$result){
		die("mysqli error ".mysqli_error($GLOBALS['connection']));
	}
}

function humanDate($string){
	if($string==null){
		return "";
	}
	return date("F jS Y",strtotime($string));
}


?>