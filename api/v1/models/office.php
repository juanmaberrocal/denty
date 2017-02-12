<?php
class office {
	private static $table_name = 'offices';

	private static $columns_all = array(
			'id', 
			'name', 
			'domain', 
			'logo_source', 
			'contact_phone', 
			'contact_email', 
			'contact_address', 
			'created_at', 
			'updated_at'
		);

	public static $columns_public = array(
			'name', 
			'domain', 
			'logo_source', 
			'contact_phone', 
			'contact_email', 
			'contact_address'
		);

	/*===============================
	define query string builders here
	===============================*/
	// get office
	function getFromDomain($office_domain, $limit = 1, $cols = array(), $ext_cols = array()){
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
		// find by domain
		// order by descending ids (newest first)
		// limit results
		return "SELECT ".$select_string." FROM ".self::$table_name." WHERE ".self::$table_name.".domain='".$office_domain."' ORDER BY ".self::$table_name.".id DESC LIMIT ".$limit;
	}

	// get office and settings
	function getWithSettings($office_domain, $limit = 1, $cols = array(), $ext_cols = array()){
		// build office select
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

		// build office settings select
		$settings_select_string = $this->buildOfficeSettingsSelect();

		// select defined columns
		// find by domain
		// order by descending ids (newest first)
		// limit results
		return "SELECT ".$select_string.",".$settings_select_string." FROM ".self::$table_name." INNER JOIN office_settings ON ".self::$table_name.".id = office_settings.office_id WHERE ".self::$table_name.".domain='".$office_domain."' ORDER BY ".self::$table_name.".id DESC LIMIT ".$limit;
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

	/*=============
	office settings
	=============*/
	private function buildOfficeSettingsSelect(){
		include_once('models/office_setting.php');
		$officeSetting = new officeSetting();

		$cols = $officeSetting::$columns_public;
		$select_string = $officeSetting->buildSelectString($cols);

		return $select_string;
	}
}
?>