<?php include('includes/header.php'); ?>
<!-- Begin Page Content -->
<div class="container-fluid">

<h2 class="text-center">Welcome 
<?php echo isset($_SESSION['admin'])?"Admin":$_SESSION['user']->fname ?></h2>
</div>
<!-- /.container-fluid -->

<?php include('includes/footer.php') ?>