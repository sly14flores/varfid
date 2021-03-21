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

			.table {
				border-collapse: collapse;
				width: 100%;
				border: 1px solid rgb(189, 189, 189);
				font-size: 0.8em;
				color:rgb(99, 99, 99);
			}
			table.table, .table th, .table td {
				border: 1px solid rgb(189, 189, 189);
			}
		</style>
	</head>
	<body>
		<div class="wrapper">
			<div class="header">
				<img class="logo" src="{{ $logo }}" />
				<p style="float: right">Vehicle Logs</p>
			</div>
			<div class="content">
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
			</div>
		</div>
	</body>
</html>