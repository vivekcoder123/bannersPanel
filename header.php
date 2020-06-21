<?php
ob_start();
session_start();
include("admin/includes/functions.php");
?>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
<link rel="stylesheet" type="text/css" href="styles.css">
<nav class="navbar navbar-expand-sm   navbar-light fixed-top">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="index.php">Home <span class="sr-only">(current)</span></a>
            </li>
          </ul>

          <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="register.php">Sign Up <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item ml-2">
              <a class="nav-link" href="login.php">Login</a>
            </li>
          </ul>
        </div>
      </nav>

      <?php if(isset($_SESSION['error_msg'])){ ?>
            <div class="alert alert-danger m-auto text-center" style="width:100%;">
                <?php echo $_SESSION['error_msg'];unset($_SESSION['error_msg']); ?>    
            </div>
          <?php } ?>

          <?php if(isset($_SESSION['success_msg'])){ ?>
            <div class="alert alert-success m-auto text-center" style="width:100%;">
                <?php echo $_SESSION['success_msg'];unset($_SESSION['success_msg']); ?>    
            </div>
          <?php } ?>