<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
</head>
<body>
<script type="text/javascript">
    $(document).ready(function () {
        $.get('asd', function (data) {
            console.log(data);
        });
    });
</script>
</body>
</html>