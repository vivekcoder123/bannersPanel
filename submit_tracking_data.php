<?php
include("admin/includes/functions.php");
$ip=$_GET['ip_address'];
$ad_type=$_GET['ad_type'];
$website=$_GET['website'];
$interaction_type=$_GET['interaction_type'];
if(isset($ip) && isset($ad_type) && isset($website) && isset($interaction_type)){
    $insert=query("INSERT into stats(ip_address,ad_type,website,interaction_type) 
    VALUES('$ip','$ad_type','$website','$interaction_type')");
    confirm($insert);
}
?>