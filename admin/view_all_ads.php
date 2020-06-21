<?php include('includes/header.php') ?>
        <!-- Begin Page Content -->
 
<?php  

if(isset($_GET['delete'])){
	$id=$_GET['delete'];
	$delete=query("DELETE from ads_data where id='$id'");
	$_SESSION['success_msg']="Advertisement successfully removed !";
	header("Location:view_all_ads.php");
}

?>
        <div class="container-fluid">

        <h2 class="text-center">View All Ads</h2>  

        <table class="table table-bordered table-striped table-responsive" style="margin-top:5%;">
        	
			<thead class="bg-dark text-white">
				<tr>
					<th>Ad Type</th>
					<th>Browser</th>
					<th>Image</th>
					<th>Title</th>
                    <th>Description</th>
                    <th>Link</th>
					<th colspan="2">Action</th>
				</tr>
			</thead>

			<tbody>
				<?php  

					$ads_data=query("SELECT * from ads_data");
					while($row=mysqli_fetch_object($ads_data)){

				?>

				<tr>
					<td><?php echo $row->ad_type ?></td>
					<td><?php echo $row->browser ?></td>
                    <td><img src="<?php echo $row->image ?>" alt="image" width="80"></td>
                    <td><?php echo $row->title ?></td>
                    <td><?php echo $row->description ?></td>
                    <td><?php echo $row->link ?></td>
                    <td><a class="btn btn-info" href="edit_ad.php?id=<?php echo $row->id ?>">Edit</a></td>
					<td><a class="btn btn-danger" href="?delete=<?php echo $row->id ?>">Delete</a></td>
				</tr>

				<?php } ?>
			</tbody>

        </table>

        </div>
        <!-- /.container-fluid -->

        <?php include('includes/footer.php') ?>