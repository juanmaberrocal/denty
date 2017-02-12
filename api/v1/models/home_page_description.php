<?php
class homePageDescription {
	private static $table_name = 'home_page_descriptions';

	private static $columns_all = array(
			'id',
			'office_id',
			'home_page_id',
			'header',
			'description',
			'active',
			'created_at',
			'updated_at'
		);

	public static $columns_public = array(
			'header',
			'description'
		);

	/*===============================
	define query string builders here
	===============================*/
	// get home page descriptions from a specific office
	function getFromOffice($office_domain, $limit = 1, $cols = array(), $ext_cols = array()){
		// if no specific columns were passed use defined public cols
		if (empty($cols)){
			$cols = self::$columns_public;
		}

		// if a specific col is needed apart from defaults add to columns
		if (!empty($ext_cols)){
			$cols = array_merge($cols, $ext_cols);
		}

		// build select string from colums
		$select_string = $this->buildSelectString($cols);

		// select defined columns
		// find through office
		// order by descending ids (newest first)
		// limit results
		return "SELECT ".$select_string." FROM ".self::$table_name." INNER JOIN offices ON ".self::$table_name.".office_id = offices.id WHERE ".self::$table_name.".active=1 AND offices.domain='".$office_domain."' ORDER BY ".self::$table_name.".id DESC LIMIT ".$limit;
	}

	// get home page descriptions from a specific home page
	function getFromHomePage($home_page_id, $limit = 1, $cols = array(), $ext_cols = array()){
		// if no specific columns were passed use defined public cols
		if (empty($cols)){
			$cols = self::$columns_public;
		}

		// if a specific col is needed apart from defaults add to columns
		if (!empty($ext_cols)){
			$cols = array_merge($cols, $ext_cols);
		}

		// build select string from colums
		$select_string = $this->buildSelectString($cols);

		// select defined columns
		// find through home page
		// order by descending ids (newest first)
		// limit results
		return "SELECT ".$select_string." FROM ".self::$table_name." INNER JOIN home_pages ON ".self::$table_name.".home_page_id = home_pages.id WHERE ".self::$table_name.".active=1 AND home_pages.id=".$home_page_id." ORDER BY ".self::$table_name.".id DESC LIMIT ".$limit;
	}

	// 
	private function buildSelectString($cols){
		$select_string = "";
		foreach ($cols as $col){
			$select_string .= self::$table_name.".".$col.",";
		}
		// return select string without trailing comma
		return rtrim($select_string, ",");
	}
}
?>