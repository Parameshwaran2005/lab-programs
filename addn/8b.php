<?php
$conn = new mysqli("localhost","root","","students");
$q = $conn->query("SELECT * FROM students");
$students = [];
while($row = $q->fetch_assoc()){
    $students[] = $row;
}
function selectionsort(&$a){
    $n = count($a);
    for($i=0;$i<$n-1;$i++){
        $min = $i;
        for($j=$i+1;$j<$n;$j++){
            if($a[$j]['name'] < $a[$min]['name'])
                $min = $j;
        }
        $t = $a[$i];
        $a[$i] = $a[$min];
        $a[$min] = $t;
    }
    }
    selectionsort($students);
?>
<!Doctype html>
<head>
<title>php</title>
<style>
table{
    border: 1px solid black;
    border-collapse: collapse;
}
tr,td,th{
    border: 1px solid black;
}
</style>
</head>
<body>
<table>
<tr>
<th>Name</th>
<th>USN</th>
<th>dob</th>
<th>address</th>
</tr>
<?php 
foreach($students as $s){
    echo "<tr>
    <td>{$s['name']}</td>
    <td>{$s['usn']}</td>
    <td>{$s['dob']}</td>
    <td>{$s['address']}</td>
    </tr>";
}
?>
</table>
</body>
</html>