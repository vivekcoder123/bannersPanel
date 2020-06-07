<?php include('includes/header.php') ?>
        <!-- Begin Page Content -->
 
<?php  

function deleteDir($dirPath) {
    if (! is_dir($dirPath)) {
        $_SESSION['error_msg']="Some error occured !";
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
            // unlink($file);
        }
    }
    // rmdir($dirPath);
}

if(isset($_GET['delete'])){
	$id=$_GET['delete'];
	$url="../".$GET['url'];
	echo $url;
	// deleteDir("../$url");
	// $delete=query("DELETE from websites where id='$id'");
	// $_SESSION['success_msg']="Website successfully removed !";
	// header("Location:view_all_websites.php");
}

?>
        <div class="container-fluid">

        <h2 class="text-center">View All Websites</h2>  

        <table class="table table-bordered table-striped" style="margin-top:5%;">
        	
			<thead class="bg-dark text-white">
				<tr>
					<th>Name</th>
					<th>Url</th>
					<th>Action</th>
				</tr>
			</thead>

			<tbody>
				<?php  

					$websites=query("SELECT * from websites");
					while($row=mysqli_fetch_object($websites)){

				?>

				<tr>
					<td><?php echo $row->name ?></td>
					<td><?php echo $row->url ?></td>
					<td><a class="btn btn-danger" href="?url=<?php echo $row->url?>&delete=<?php echo $row->id ?>">Delete</a></td>
				</tr>

				<?php } ?>
			</tbody>

        </table>

        </div>
        <!-- /.container-fluid -->

        <?php include('includes/footer.php') ?>