<?php
include("header.php");
if(isset($_POST['submit'])){
    $email=escape($_POST['email']);
    $password=escape($_POST['password']);
    $check=query("SELECT * from users where email='$email' and password='$password'");
    confirm($check);
    if(mysqli_num_rows($check)>0){
        $user=mysqli_fetch_object($check);
        $_SESSION['user']=$user;
        $_SESSION['success_msg']="Login Successful !";
        header("Location:admin/index.php");
    }else{
        $_SESSION['error_msg']="Please enter correct credentials !";
        header("Location:login.php");
    }
}
?>
<div class="container">
	<div class="d-flex justify-content-center h-100">
		<div class="card">
			<div class="card-header">
				<h3>Sign In</h3>
			</div>
			<div class="card-body">
				<form method="post" action="">
					<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fas fa-user"></i></span>
						</div>
						<input type="email" class="form-control" placeholder="email" name="email" required>
						
					</div>
					<div class="input-group form-group">
						<div class="input-group-prepend">
							<span class="input-group-text"><i class="fas fa-key"></i></span>
						</div>
						<input type="password" class="form-control" placeholder="password" name="password" required>
					</div>
					<div class="row align-items-center remember">
						<input type="checkbox">Remember Me
					</div>
					<div class="form-group">
						<input type="submit" name="submit" value="Login" class="btn float-right login_btn">
					</div>
				</form>
			</div>
			<div class="card-footer">
				<div class="d-flex justify-content-center links">
					Don't have an account?<a href="register.php">Sign Up</a>
				</div>
			</div>
		</div>
	</div>
</div>