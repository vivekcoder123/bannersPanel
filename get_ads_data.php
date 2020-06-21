<?php
include("admin/includes/functions.php");
$ad_type=$_GET['ad_type'];
$browser=$_GET['browser'];
$ip_address=$_GET['ip_address'];
if(isset($ad_type) && isset($ip_address) && isset($browser)){
    if($ad_type=="ad_format_1" || $ad_type=="ad_format_2"){
        $ads_group_by_id=query("SELECT ad_id,COUNT(*) from stats where deleted!=1 and ip_address='$ip_address' and ad_type='$ad_type' and interaction_type='view' group by ad_id");
    }else{
        $ads_group_by_id=query("SELECT ad_id,COUNT(*) from stats where deleted!=1 and ip_address='$ip_address' and ad_type='$ad_type' and interaction_type='click' group by ad_id");
    }
    confirm($ads_group_by_id);
    $noShowAds=array();
    while($row=mysqli_fetch_assoc($ads_group_by_id)){
        if($row['COUNT(*)']>1){
            array_push($noShowAds,(int)$row['ad_id']);
        }
    }
    $noShowIds=implode(",",$noShowAds);
    if(count($noShowAds)>0){
        $fetch_data=query("SELECT * from ads_data where ad_type='$ad_type' and browser='$browser' and id NOT IN ($noShowIds) order by id asc");
        if(mysqli_num_rows($fetch_data)<1){
            if($ad_type=="ad_format_1" || $ad_type=="ad_format_2"){
                $update=query("UPDATE stats set deleted=1 where ip_address='$ip_address' and ad_type='$ad_type' and interaction_type='view'");
            }else{
                $update=query("UPDATE stats set deleted=1 where ip_address='$ip_address' and ad_type='$ad_type' and interaction_type='click'");
            }
            confirm($update);
            $fetch_data=query("SELECT * from ads_data where ad_type='$ad_type' and browser='$browser' order by id asc");
        }
    }else{
        $fetch_data=query("SELECT * from ads_data where ad_type='$ad_type' and browser='$browser' order by id asc");
    }
    $data=mysqli_fetch_assoc($fetch_data);
    echo json_encode($data);
}
?>