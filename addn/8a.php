<?php
$counterfile = "counter.txt";
if(!file_exists($counterfile)){
    file_put_contents($counterfile,"0");
}
$currentcount = file_get_contents($counterfile);
$newcount = $currentcount + 1;
file_put_contents($counterfile,$newcount);
?>
<!Doctype html>
<head>
    <title>
        Counter 
    </title>
</head>
<body>
    <strong><?php echo $newcount ?></strong>
</body>
</html>