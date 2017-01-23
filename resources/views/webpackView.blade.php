<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    @if(env('APP_DEBUG'))
        <link href="assets/preloader.css?v={{time()}}" type="text/css" rel="prefetch" onload="this.rel='stylesheet'">
    @else
        <link href="assets/preloader.css?v={{env('APP_VER')}}" type="text/css" rel="prefetch" onload="this.rel='stylesheet'">
    @endif

</head>
<body>
<div id="app">
    <div id="loader-wrapper">
        <div id="loader"></div>

        <div class="loader-section section-left"></div>
        <div class="loader-section section-right"></div>
        <style type="text/css">
            body {
                background-color: #222222;
            }
        </style>
    </div>
</div>
    <script type="text/javascript" src="http://localhost:8888/assets/bundle.js"></script>
</body>
</html>