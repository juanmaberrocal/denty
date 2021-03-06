<?php
class homePage {
	private static $table_name = 'home_pages';

	private static $columns_all = array(
			'id', 
			'office_id', 
			'has_description', 
			'description_limit', 
			'has_carousel', 
			'carousel_limit', 
			'has_highlights', 
			'highlight_limit', 
			'has_promotions', 
			'promotions_from_offers', 
			'promotion_limit', 
			'has_thumbnails', 
			'thumbnails_from_gallery', 
			'thumbnail_limit', 
			'created_at', 
			'updated_at'
		);

	public static $columns_public = array(
			'has_description', 
			'description_limit', 
			'has_carousel', 
			'carousel_limit', 
			'has_highlights', 
			'highlight_limit', 
			'has_promotions', 
			'promotions_from_offers', 
			'promotion_limit', 
			'has_thumbnails', 
			'thumbnails_from_gallery', 
			'thumbnail_limit'
		);

	/*===============================
	define query string builders here
	===============================*/
	// get home page from a specific office
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
		return "SELECT ".$select_string." FROM ".self::$table_name." INNER JOIN offices ON ".self::$table_name.".office_id = offices.id WHERE offices.domain='".$office_domain."' ORDER BY ".self::$table_name.".id DESC LIMIT ".$limit;
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