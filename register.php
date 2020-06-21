<?php
include("header.php");
if(isset($_POST['submit'])){
    $fname=escape($_POST['fname']);
    $lname=escape($_POST['lname']);
    $email=escape($_POST['email']);
    $password=escape($_POST['password']);
    $phone=escape($_POST['phone']);
    $country=escape($_POST['country']);
    $city=escape($_POST['city']);
    $address=escape($_POST['address']);
    $account_type=escape($_POST['account_type']);
    if(isset($_POST['company'])){
        $company=escape($_POST['company']);
    }else{
        $company="";
    }
    $check=query("SELECT email from users where email='$email' ");
    confirm($check);
    if(mysqli_num_rows($check)>0){
        $_SESSION['error_msg']="You are already registered,please login !";
    }else{
        $insert=query("INSERT into users (fname,lname,email,password,phone,country,city,address,account_type,company_name) 
        VALUES('$fname','$lname','$email','$password','$phone','$country','$city','$address','$account_type','$company')");
        confirm($insert);
        $_SESSION['success_msg']="You are registered successfully,please login !";
    }
    header("Location:login.php");
}
?>
<div class="container">
	<div class="d-flex justify-content-center h-100">
		<div class="card">
			<div class="card-header">
				<h3>Register</h3>
			</div>
			<div class="card-body">
				<form method="post" action="">
                    <div class="form-group">
                        <label>Account Type:</label>
                        <div>
                        <label><input type="radio" value="individual" name="account_type" checked> Individual</label>
                        <label><input type="radio" value="company" name="account_type"> Company</label>
                        </div>
                    </div>
                    <div class="form-group" id="companyDiv" style="display:none;">
                        <label>Company Name:</label>
                        <input type="text" class="form-control" name="company" placeholder="Enter company name">
                    </div>
                    <div class="row form-group">
                        <div class="col-md-6">
                        <label>Country of Residence:</label>
						<input type="text" class="form-control" name="country" placeholder="Enter country" required>
                        </div>
                        <div class="col-md-6">
                        <label>City:</label>
						<input type="text" class="form-control" name="city" placeholder="Enter city"  required> 
                        </div>		
					</div>
					<div class="form-group">
                        <label>Address:</label>
						<input type="text" class="form-control" name="address" placeholder="Enter address" required>		
					</div>
					<div class="row form-group">
                        <div class="col-md-4">
                        <label>First Name:</label>
						<input type="text" class="form-control" name="fname" placeholder="Enter first name" required>
                        </div>
                        <div class="col-md-4">
                        <label>Last Name:</label>
						<input type="text" class="form-control" name="lname" placeholder="Enter last name" required> 
                        </div>	
                        <div class="col-md-4">
                        <label>Password:</label>
						<input type="password" class="form-control" name="password" placeholder="Enter password" required> 
                        </div>		
                    </div>
                    <div class="row form-group">
                        <div class="col-md-6">
                        <label>Email:</label>
						<input type="email" class="form-control" name="email" placeholder="Enter email" required>
                        </div>
                        <div class="col-md-6">
                        <label>Phone Number:</label>
						<input type="number" class="form-control" name="phone" placeholder="Enter phone number" required> 
                        </div>		
                    </div>
					<div class="form-group mt-2">
						<input type="submit" name="submit" value="Register" class="btn btn-block login_btn">
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<script>
    $("input[name=account_type]").change(function(){
        if($(this).val()=="company"){
            $("#companyDiv").show();
        }else{
            $("#companyDiv").hide();
        }
    });
</script>