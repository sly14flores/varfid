<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
		<title>{{ config('app.name', 'Vehicle Automation RFID') }}</title>
        <style type="text/css">
        
            html, body {
                margin: 0!important;
            }

        </style>
    </head>
    <body>
    <div id="app"></div>
    <script type="text/javascript" src="{{ env('APP_URL') }}/js/app.js?id={{ rand() }}"></script>    
    </body>
</html>