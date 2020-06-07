<?php include('includes/header.php') ?>
<!-- Begin Page Content -->
<?php 

if(isset($_POST['submit'])){
	$email=escape($_POST['email']);
	$password=escape($_POST['password']);
	$rows=query("SELECT * from admin_users where email='$email' and password='$password'");
	confirm($rows);
	if(mysqli_num_rows($rows)>0){
		$_SESSION['admin']=true;
		$_SESSION['success_msg']="Login Successful !";
		header("Location:index.php");
	}else{
		$_SESSION['error_msg']="Please enter correct credentials !";
		header("Location:login.php");
	}
}

?>
<div class="container-fluid">

<h2 class="text-center">Admin Login</h2>

<form action="" method="post" style="padding:4% 25%;">
	<div class="form-group">
		<input type="email" placeholder="Enter Email" name="email" class="form-control">
	</div>
	<div class="form-group">
		<input type="password" placeholder="Enter Password" name="password" class="form-control">
	</div>
	<input type="submit" name="submit" value="Login" class="btn btn-primary">
</form>  

</div>
<!-- /.container-fluid -->

<?php include('includes/footer.php') ?>