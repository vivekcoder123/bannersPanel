<?php include('includes/header.php') ?>

<?php  

$css=array();
$js=array();

function custom_copy($src, $dst) {  
  	
    $dir = opendir($src);  
  
    @mkdir($dst);  
  
    while( $file = readdir($dir) ) {  
  
        if (( $file != '.' ) && ( $file != '..' )) {  
            if ( is_dir($src . '/' . $file) )  
            {  
  
                custom_copy($src . '/' . $file, $dst . '/' . $file);  
  
            }  
            else {  
                copy($src . '/' . $file, $dst . '/' . $file);  
                if(strpos($file,".css")!==false){
                	array_push($css,$file);
                	var_dump($css);
                }else if(strpos($file,".js")!==false){
                	array_push($js,$file);
                	var_dump($js);
                }
            }  
        }  
    }  
  
    closedir($dir); 
}  

if(isset($_POST['submit'])){

	$name=escape($_POST['name']);
	$url=escape($_POST['url']);
	$scripts=array('scripts_css','scripts_js');
	$dst = "../$url";

	foreach($scripts as $script){
		$src = "./$script"; 
		custom_copy($src, $dst);
	}

	$find_website=query("SELECT * from websites where url='$url'");
	if(mysqli_num_rows($find_website)>0){
		$_SESSION['error_msg']="This website url is already added to the websites list !";
		header("Location:add_website.php");
	}else{
		$insert_website =query("INSERT into websites(name,url) VALUES('$name','$url')");
		confirm($insert_website);
		$website_id = mysqli_insert_id($connection);
		$css=implode(',',$css);
		$js=implode(',',$js);
		$insert_scripts_links=query("INSERT into scripts_links(website_id,css,js) VALUES('$website_id','$css','$js')");
		confirm($insert_scripts_links);
		$_SESSION['success_msg']="Website added successfully !";
		header("Location:view_all_websites.php");
	}

}

?>

<!-- Begin Page Content -->
<div class="container-fluid">

<h2 class="text-center">Add Website</h2>

  <form action="" method="post" style="margin-top:5%;">
  	<div class="form-group">
  		<input type="text" placeholder="Enter Name" class="form-control" required name="name">
  	</div>
  	<div class="form-group">
  		<input type="text" placeholder="Enter Url" class="form-control" required name="url">
  	</div>
  	<input type="submit" name="submit" class="btn btn-success" value="Save">
  </form>

</div>
<!-- /.container-fluid -->

<?php include('includes/footer.php') ?>