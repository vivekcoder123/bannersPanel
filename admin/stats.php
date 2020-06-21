<?php include("includes/header.php"); ?>

<?php

$website=$_GET['website'];
if(isset($_GET['type'])){
    $type=$_GET['type'];
    $stats=query("SELECT * from stats where website LIKE '%$website%' and interaction_type='$type' ");
}else{
    $stats=query("SELECT * from stats where website LIKE '%$website%' ");
}
confirm($stats);
$totalInteractionsCount=mysqli_num_rows($stats);
if(!isset($_GET['type'])){
    $totalViews=query("SELECT * from stats where website LIKE '%$website%' and interaction_type='view' ");
    $totalViewsCount=mysqli_num_rows($totalViews);
    $totalClicks=query("SELECT * from stats where website LIKE '%$website%' and interaction_type='click' ");
    $totalClicksCount=mysqli_num_rows($totalClicks);
}
?>

<div class="container-fluid">
<h2 class="text-center" style="margin-bottom:2%;">Statistics of website : <strong><?php echo $website ?></strong></h2>

<div class="row text-center" style="margin-bottom:2%;">
    <?php if(isset($_GET['type'])){ ?>
    <div class="col-md-6">Total <?php echo ucwords($_GET['type']."s") ?> : <a href="stats.php?type=<?php echo $_GET['type'] ?>&website=<?php echo $website ?>"><?php echo $totalInteractionsCount ?></a></div>
    <div class="col-md-6"><a href="stats.php?website=<?php echo $website ?>">Show All Interactions</a></div>
    <?php } ?>
    <?php if(!isset($_GET['type'])){ ?>
    <div class="col-md-4">Total Interactions : <a href="stats.php?website=<?php echo $website ?>"><?php echo $totalInteractionsCount ?></a></div>
    <div class="col-md-4">Total Views : <a href="stats.php?type=view&website=<?php echo $website ?>"><?php echo $totalViewsCount ?></a></div>
    <div class="col-md-4">Total Clicks : <a href="stats.php?type=click&website=<?php echo $website ?>"><?php echo $totalClicksCount ?></a></div>
    <?php } ?>
</div>

<table class="table table-bordered table-striped">

<thead>
    <tr>
        <th>IP address</th>
        <th>Ad type</th>
        <th>Impression type</th>
        <th>Datetime</th>
    </tr>
</thead>

<tbody>

<?php
while($row=mysqli_fetch_array($stats)){
?>
<tr>
    <td><?php echo $row['ip_address'] ?></td>
    <td><?php echo $row['ad_type'] ?></td>
    <td><?php echo $row['interaction_type'] ?></td>
    <td><?php echo humanDate($row['created_at']) ?></td>
</tr>
<?php } ?>

</tbody>

</table>

</div>

<?php include("includes/footer.php"); ?>