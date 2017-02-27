<?php
class service {
	private static $table_name = 'services';

	private static $columns_all = array(
			'id', 
			'office_id', 
			'services_page_id',
			'has_image',
			'image_name', 
			'image_source',
			'title',
			'description',
			'active', 
			'created_at', 
			'updated_at'
		);

	public static $columns_public = array(
			'has_image',
			'image_name', 
			'image_source',
			'title',
			'description'
		);

	/*===============================
	define query string builders here
	===============================*/
	// get services from a specific office
	function getFromOffice($office_domain, $limit = 6, $cols = array(), $ext_cols = array()){
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

	// get services from a specific service page
	function getFromServicesPage($services_page_id, $limit = 6, $cols = array(), $ext_cols = array()){
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
		// find through service page
		// order by descending ids (newest first)
		// limit results
		return "SELECT ".$select_string." FROM ".self::$table_name." INNER JOIN service_pages ON ".self::$table_name.".services_page_id = service_pages.id WHERE ".self::$table_name.".active=1 AND service_pages.id='".$services_page_id."' ORDER BY ".self::$table_name.".id DESC LIMIT ".$limit;
	}

	// 
	// todo: DRY build string select
	public function buildSelectString($cols){
		$select_string = "";
		foreach ($cols as $col){
			$select_string .= self::$table_name.".".$col.",";
		}
		// return select string without trailing comma
		return rtrim($select_string, ",");
	}
}
?>