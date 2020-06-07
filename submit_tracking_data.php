<?php
include("admin/includes/functions.php");
$ip=$_GET['ip_address'];
$ad_type=$_GET['ad_type'];
$website=$_GET['website'];
$interaction_type=$_GET['interaction_type'];
$ad_id=(int)$_GET['ad_id'];
if(isset($ip) && isset($ad_type) && isset($website) && isset($interaction_type) && isset($ad_id)){
    $insert=query("INSERT into stats(ip_address,ad_type,website,interaction_type,ad_id) 
    VALUES('$ip','$ad_type','$website','$interaction_type','$ad_id')");
    confirm($insert);
}
?>