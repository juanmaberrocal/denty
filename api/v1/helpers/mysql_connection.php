<?php
class mySqlConnection {
	// connection
	var $conn;

	// 
	function __construct(){
		// DB configuration
		// TODO: use getenv();
		$servername = "localhost";
		$username = "root";
		$password = "quagmire1";
		$dbname = "denty_dev";

		// build connection
		$this->conn = new mysqli($servername, $username, $password, $dbname);

		// ensure connection was established
		if (mysqli_connect_error()) {
			// return failure if connection was not successful
			header('Content-Type: application/json');
			header('HTTP/1.1 500 Internal Server Error');
			die(json_encode(array('error' => 'Connection Failed', 'raw' => mysqli_connect_error())));
		} 
	}

	// close connection when destroyed
	function __destruct(){
		$this->conn->close();
	}

	/*=================
	Connection handlers
	=================*/
	// get live connection
	function getConnection(){
		return $this->conn;
	}

	// close live connection
	function closeConnection(){
		$this->conn->close();
	}

	/*============
	Query handlers
	============*/
	function query($query){
		$conn = $this->conn;

		$raw_results = mysqli_query($conn, $query);

		// ensure query runs correctly
		if ($raw_results){
			// jsonfy results for response data
			$types = $this->getResultTypes($raw_results);
			$json_results = $this->jsonfyResults($raw_results, $types);
			
			// return sql query results as typecasted json object
			return $json_results;
		} else {
			// flag for failed query
			return false;
		}

	}

	function insert($query){
		$conn = $this->conn;

		$raw_results = mysqli_query($conn, $query);

		// ensure query runs correctly
		if ($raw_results){
			// get id of new record
			$record_id = mysqli_insert_id($conn);

			// get table of insert
			preg_match('/^INSERT INTO\s+(\w+)\s+/i', $query, $table);

			// get record inserted
			$lastRecordQuery = "SELECT * FROM $table[1] WHERE id = $record_id";
			$result = $this->query($lastRecordQuery);

			if ($result){
				// return new record
				return $result[0];
			} else {
				// flag for failed find of new record
				return false;
			}
		} else {
			// flag for failed query
			return false;
		}
	}

	/*===========
	Query helpers
	===========*/
	// safe escape variables to be passed to query string
	function escapeString($var){
		$conn = $this->conn;
		return mysqli_real_escape_string($conn, $var);
	}

	// jsonfy results
	private function jsonfyResults($results, $types){
		$json = array();
		while($row = mysqli_fetch_assoc($results)) {
		   $json[] = $this->typeCastResults($row, $types);
		}

		// return json object result
		return $json;
	}

	// get column types of results used for typecasting
	private function getResultTypes($results){
		$fields = mysqli_fetch_fields($results);
    $types = array();
    foreach($fields as $field) {
        switch($field->type) {
      		case 1:
      			$types[$field->name] = 'bool';
      			break;
          case 3:
            $types[$field->name] = 'int';
            break;
          case 4:
            $types[$field->name] = 'float';
            break;
          default:
            $types[$field->name] = 'string';
            break;
        }
    }
    // return array of types
		return $types;
	}

	// typecast results
	private function typeCastResults($row, $types){
		foreach($types as $name => $type) {
      settype($row[$name], $type);
    }

    return $row;
	}
}
?>