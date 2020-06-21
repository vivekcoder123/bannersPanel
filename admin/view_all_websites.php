<?php include('includes/header.php') ?>
        <!-- Begin Page Content -->
 
<?php  

function deleteDir($dirPath) {
    if (! is_dir($dirPath)) {
        $_SESSION['error_msg']="Directory does not exist !";
		header("Location:view_all_websites.php");
    }
    if (substr($dirPath, strlen($dirPath) - 1, 1) != '/') {
        $dirPath .= '/';
    }
	$files = glob($dirPath . '*', GLOB_MARK);
	var_dump($files);
    foreach ($files as $file) {
		echo $file;
        if (is_dir($file)) {
            continue;
        } else {
            unlink($file);
        }
    }
    rmdir($dirPath);
}

if(isset($_GET['delete'])){
	$id=$_GET['delete'];
	$url="../".$_GET['url'];
	deleteDir($url);
	$delete=query("DELETE from websites where id='$id'");
	$scripts_delete=query("DELETE from scripts_links where website_id='$id'");
	$_SESSION['success_msg']="Website successfully removed !";
	header("Location:view_all_websites.php");
}

if(isset($_GET['status'])){
    $status=$_GET['status'];
    $id=$_GET['website_id'];
    $update=query("UPDATE websites set status='$status' where id='$id'");
    confirm($update);
    header("Location:view_all_websites.php");
}

?>
        <div class="container-fluid" style="overflow:auto;">

        <h2 class="text-center">View All Websites</h2>  

        <table class="table table-bordered table-striped" style="margin-top:5%;">
        	
			<thead class="bg-dark text-white">
				<tr>
					<th>Name</th>
					<th>Url</th>
					<?php if(isset($_SESSION['admin'])){ ?>
					<th>Scripts</th>
					<?php } ?>
					<th>Status</th>
					<?php if(isset($_SESSION['admin'])){ ?>
					    <th>Action</th>
				    <?php } ?>
				    <th>Statistics</th>
				</tr>
			</thead>

			<tbody>
				<?php  

					if(isset($_SESSION['admin'])){
						$websites=query("SELECT websites.id as id, websites.name as name,websites.url as url,websites.status as status,scripts_links.css as css,scripts_links.js as js from websites join scripts_links where websites.id=scripts_links.website_id");
					}else{
						$user_id=$_SESSION['user']->id;
						$websites=query("SELECT websites.id as id, websites.name as name,websites.url as url,websites.status as status,scripts_links.css as css,scripts_links.js as js from websites join scripts_links where websites.id=scripts_links.website_id and websites.user_id='$user_id'");
					}
					while($row=mysqli_fetch_object($websites)){

				?>

				<tr>
					<td><?php echo $row->name ?></td>
					<td><?php echo $row->url ?></td>
					<?php if(isset($_SESSION['admin'])){ ?>
					<td><?php echo str_replace('..',$_SERVER['SERVER_NAME'],$row->js) ?></td>
					<?php } ?>
					<?php if(isset($_SESSION['admin'])){ ?>
					    <td><a href="?status=<?php echo $row->status==1?0:1 ?>&website_id=<?php echo $row->id ?>"><?php echo $row->status==1?"Active":"Pending" ?></a></td>
					<?php }else{ ?>
					    <td><?php echo $row->status==1?"Active":"Pending" ?></td>
					<?php } ?>
					<?php if(isset($_SESSION['admin'])){ ?>
					    <td><a class="btn btn-danger" href="?url=<?php echo $row->url?>&delete=<?php echo $row->id ?>">Delete</a></td>
					<?php } ?>
					<?php if($row->status==1){ ?>
					<td><a href="stats.php?website=<?php echo $row->url ?>">Know More</a></td>
					<?php }else{ ?>
					<td><span>Your website is in pending state</span></td>
					<?php } ?>
				</tr>

				<?php } ?>
			</tbody>

        </table>

        </div>
        <!-- /.container-fluid -->

        <?php include('includes/footer.php') ?>