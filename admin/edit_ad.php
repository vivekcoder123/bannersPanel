<?php include('includes/header.php') ?>

<?php  

$id=$_GET['id'];
$ad_data=query("SELECT * from ads_data where id='$id'");
confirm($ad_data);
$ad_data=mysqli_fetch_object($ad_data);
$ad_types=["floating_banner","popover","ad_format_1","ad_format_2","ad_format_3","ad_format_4"];
$browsers=["windows_chrome","android_chrome","windows_firefox"
,"android_firefox","mac_safari","mac_chrome","mac_firefox",
"android_opera","windows_opera","iphone_chrome","iphone_firefox","iphone_safari","windows_not_defined","android_not_defined","mac_not_defined","iphone_not_defined"];

if(isset($_POST['submit'])){

    $title=escape($_POST['title']);
    $description=escape($_POST['description']);
    $link=escape($_POST['link']);
    $browser=escape($_POST['browser']);
    $ad_type=escape($_POST['ad_type']);
    if (strlen($_FILES['image']['name']) > 0)
    {
        $target_dir = "uploads/";
        $image=time().basename($_FILES["image"]["name"]);
        $target_file = $target_dir.$image;
        move_uploaded_file($_FILES["image"]["tmp_name"], $target_file);
        $server_url=$_SERVER['REQUEST_URI'];
        $end= strrpos($server_url,"/");
        $server_url=substr($server_url,0,$end)."/uploads";
        $image="//".$_SERVER['SERVER_NAME'].$server_url."/".$image;
    }else{
        $image=$ad_data->image;
    }
    $update=query("UPDATE ads_data set ad_type='$ad_type',browser='$browser',image='$image'
    ,title='$title',description='$description',link='$link' where id='$id'");
    confirm($update);
    $_SESSION['success_msg']="Advertisement updated successfully";
    header("Location:view_all_ads.php");
}

?>

<!-- Begin Page Content -->
<div class="container-fluid">

<h2 class="text-center">Add Advertisement</h2>

  <form action="" method="post" style="margin-top:5%;" enctype="multipart/form-data">
  	<div class="form-group">
      <label for="ad_type">Ad Type</label>
  		<select class="form-control" required name="ad_type">
          <?php foreach($ad_types as $ad_type){ ?>
          <option value="<?php echo $ad_type ?>" <?php echo $ad_type==$ad_data->ad_type?"selected":"" ?>><?php echo $ad_type ?></option>
          <?php } ?>
        </select>
  	</div>
  	<div class="form-group">
      <label for="browser">Browser</label>
  		<select class="form-control" required name="browser">
          <?php foreach($browsers as $browser){ ?>
          <option value="<?php echo $browser ?>" <?php echo $browser==$ad_data->browser?"selected":"" ?>><?php echo $browser ?></option>
          <?php } ?>
        </select>
  	</div>
    <div class="form-group">
        <input type="text" class="form-control" name="title" required placeholder="Enter Title" value="<?php echo $ad_data->title ?>">
    </div>
    <div class="form-group">
        <input type="text" class="form-control" name="link" required placeholder="Enter Link" value="<?php echo $ad_data->link ?>">
    </div>
    <div class="form-group">
        <textarea name="description" id="description" cols="30" rows="4" required placeholder="Enter Description" class="form-control"><?php echo $ad_data->description ?></textarea>
    </div>
    <div class="form-group">
        <label for="image">Image</label>
        <input type="file" class="form-control" name="image">
        <img src="<?php echo $ad_data->image ?>" alt="image" width="80">
        *Leave it , if you dont want to update the image
    </div>
  	<input type="submit" name="submit" class="btn btn-success" value="Save">
  </form>

</div>
<!-- /.container-fluid -->

<?php include('includes/footer.php') ?>