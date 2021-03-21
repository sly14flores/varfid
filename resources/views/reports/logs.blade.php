<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<title></title>	
		<style>
			body {
				font-family: Arial, Helvetica, sans-serif;
				color:rgb(66, 66, 66);
				font-size: 1em;
			}

			.logo {
				width: 100px;
			}

			.wrapper {
				/* border-width: 1px;
				border-style: solid;
				border-color:aqua;				 */
			}

			.header {
				/* border-width: 1px;
				border-style: solid;
				border-color:rgb(28, 11, 184);				 */
			}

			.content {
				/* border-width: 1px;
				border-style: solid;
				border-color:rgb(177, 17, 57);					 */
			}

			.coverage {
				margin-bottom: 10px;
				font-size: 0.75em;
			}

			.coverage span {
				display: inline-block;
				margin-right: 10px;
			}

			.table {
				border-collapse: collapse;
				width: 100%;
				border: 1px solid rgb(189, 189, 189);
				font-size: 0.8em;
			}

			table.table, .table th, .table td {
				border: 1px solid rgb(90, 90, 90);
			}

			.table th {
				padding: 5px;
				color:rgb(71, 71, 71);
				background-color:rgb(168, 168, 168);
			}

			.table td {
				font-size: 0.9em;
				padding: 3px;
			}

		</style>
	</head>
	<body>
		<script type="text/php">
			if ( isset($pdf) ) { 
				$pdf->page_script('
					if ($PAGE_COUNT > 1) {
						$font = $fontMetrics->get_font("Arial, Helvetica, sans-serif", "normal");
						$size = 9;
						$pageText = "Page " . $PAGE_NUM . " of " . $PAGE_COUNT;
						$y = 765;
						$x = 15;
						$color = array(0.50, 0.50, 0.50);
						$pdf->text($x, $y, $pageText, $font, $size, $color);
					} 
				');				
			}
		</script>
		<div class="wrapper">
			<header>
				<img class="logo" src="{{ $logo }}" />
				<p style="float: right">Vehicle Logs</p>
			</header>
			<main>
				<div class="coverage">
					@foreach($coverage as $p)
						<span>{{$p}}</span>
					@endforeach
				</div>
				<table class="table">
					<thead>
						<tr>
							<th>No</th>
							<th>RFID</th>
							<th>Plate No</th>
							<th>Vehicle Type</th>
							<th>Brand</th>
							<th>Model</th>
							<th>Owner' Name</th>
							<th>DateTime</th>
						</tr>
					</thead>
					<tbody>
						@foreach($logs as $log)
							<tr>
								<td>{{ $log['no'] }}</td>
								<td>{{ $log['rfid'] }}</td>
								<td>{{ $log['plateNo'] }}</td>
								<td>{{ $log['type'] }}</td>
								<td>{{ $log['brand'] }}</td>
								<td>{{ $log['model'] }}</td>
								<td>{{ $log['owner'] }}</td>
								<td>{{ $log['dateTime'] }}</td>
							</tr>
						@endforeach
					</tbody>
				</table>
			</main>
			<footer>

			</footer>
		</div>
	</body>
</html>