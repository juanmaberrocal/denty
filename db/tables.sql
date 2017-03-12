-- BASE
CREATE TABLE offices (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(255),
	domain VARCHAR(255),
	logo_source VARCHAR(255),
	-- logo_data BLOB,
	contact_phone VARCHAR(255),
	contact_email VARCHAR(255),
	contact_address TEXT,
	contact_hours TEXT,
	google_api VARCHAR(255),
	created_at DATETIME NOT NULL DEFAULT NOW(),
	updated_at DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
	PRIMARY KEY (id)
);

/*------------
Configurations
------------*/
-- General
CREATE TABLE office_settings (
	id INT NOT NULL AUTO_INCREMENT,
	office_id INT(11) NOT NULL,
	can_book_online BOOLEAN,
	direct_confirmation BOOLEAN,
	has_header BOOLEAN,
	has_footer BOOLEAN,
	has_social BOOLEAN,
	has_about BOOLEAN,
	about_override VARCHAR(255),
	has_services BOOLEAN,
	services_override VARCHAR(255),
	has_testimonials BOOLEAN,
	testimonials_override VARCHAR(255),
	has_gallery BOOLEAN,
	gallery_override VARCHAR(255),
	has_offers BOOLEAN,
	offers_override VARCHAR(255),
	has_rewards BOOLEAN,
	rewards_override VARCHAR(255),
	has_blog BOOLEAN,
	blog_override VARCHAR(255),
	has_map BOOLEAN,
	map_override VARCHAR(255),
	has_contact BOOLEAN,
	contact_override VARCHAR(255),
	has_financing BOOLEAN,
	financing_override VARCHAR(255),
	created_at DATETIME NOT NULL DEFAULT NOW(),
	updated_at DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
	PRIMARY KEY (id),
	FOREIGN KEY (office_id) REFERENCES offices(id)
);

-- Social Media
CREATE TABLE social_links (
	id INT NOT NULL AUTO_INCREMENT,
	office_id INT(11) NOT NULL,
	facebook VARCHAR(255),
	twitter VARCHAR(255),
	instagram VARCHAR(255),
	google_plus VARCHAR(255),
	yelp VARCHAR(255),
	created_at DATETIME NOT NULL DEFAULT NOW(),
	updated_at DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
	PRIMARY KEY (id),
	FOREIGN KEY (office_id) REFERENCES offices(id)
);

/*----------
Appointments
----------*/
CREATE TABLE appointments (
	id INT NOT NULL AUTO_INCREMENT,
	office_id INT(11) NOT NULL,
	messageable_id INT(11) NOT NULL,
	messageable_type VARCHAR(255) NOT NULL,
	name VARCHAR(255),
	appointment_date DATE,
	appointment_time TIME,
	treatment VARCHAR(255),
	phone VARCHAR(255),
	email VARCHAR(255),
	cancelled BOOLEAN,
	created_at DATETIME NOT NULL DEFAULT NOW(),
	updated_at DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
	PRIMARY KEY (id),
	FOREIGN KEY (office_id) REFERENCES offices(id)
);

/*------
Messages
------*/
CREATE TABLE message_logs (
	id INT NOT NULL AUTO_INCREMENT,
	office_id INT(11) NOT NULL,
	message_type VARCHAR(255),
	message_status VARCHAR(255),
	message_text TEXT,
	to_email VARCHAR(255),
	created_at DATETIME NOT NULL DEFAULT NOW(),
	updated_at DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
	PRIMARY KEY (id),
	FOREIGN KEY (office_id) REFERENCES offices(id)
);

/*-------
Home View
-------*/
-- Base
CREATE TABLE home_pages (
	id INT NOT NULL AUTO_INCREMENT,
	office_id INT(11) NOT NULL,
	has_description BOOLEAN,
	description_limit INT(11) DEFAULT 1,
	has_carousel BOOLEAN,
	carousel_limit INT(11) DEFAULT 3,
	has_highlights BOOLEAN,
	highlight_limit INT(11) DEFAULT 3,
	has_promotions BOOLEAN,
	promotions_from_offers BOOLEAN,
	promotion_limit INT(11) DEFAULT 1,
	has_thumbnails BOOLEAN,
	thumbnails_from_gallery BOOLEAN,
	thumbnail_limit INT(11) DEFAULT 6,
	created_at DATETIME NOT NULL DEFAULT NOW(),
	updated_at DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
	PRIMARY KEY (id),
	FOREIGN KEY (office_id) REFERENCES offices(id)
);

-- Carousel
CREATE TABLE home_page_carousels (
	id INT NOT NULL AUTO_INCREMENT,
	office_id INT(11) NOT NULL,
	home_page_id INT(11) NOT NULL,
	caption VARCHAR(255),
	image_name VARCHAR(255),
	image_source VARCHAR(255),
	-- image_data BLOB,
	active BOOLEAN DEFAULT 1,
	created_at DATETIME NOT NULL DEFAULT NOW(),
	updated_at DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
	PRIMARY KEY (id),
	FOREIGN KEY (office_id) REFERENCES offices(id),
	FOREIGN KEY (home_page_id) REFERENCES home_pages(id)
);

-- Description
CREATE TABLE home_page_descriptions (
	id INT NOT NULL AUTO_INCREMENT,
	office_id INT(11) NOT NULL,
	home_page_id INT(11) NOT NULL,
	header VARCHAR(255),
	description TEXT,
	active BOOLEAN DEFAULT 1,
	created_at DATETIME NOT NULL DEFAULT NOW(),
	updated_at DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
	PRIMARY KEY (id),
	FOREIGN KEY (office_id) REFERENCES offices(id),
	FOREIGN KEY (home_page_id) REFERENCES home_pages(id)
);

-- Highlights
CREATE TABLE home_page_highlights (
	id INT NOT NULL AUTO_INCREMENT,
	office_id INT(11) NOT NULL,
	home_page_id INT(11) NOT NULL,
	image_name VARCHAR(255),
	image_source VARCHAR(255),
	-- image_data BLOB,
	header VARCHAR(255),
	description TEXT,
	active BOOLEAN DEFAULT 1,
	created_at DATETIME NOT NULL DEFAULT NOW(),
	updated_at DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
	PRIMARY KEY (id),
	FOREIGN KEY (office_id) REFERENCES offices(id),
	FOREIGN KEY (home_page_id) REFERENCES home_pages(id)
);

-- Promotions
CREATE TABLE home_page_promotions (
	id INT NOT NULL AUTO_INCREMENT,
	office_id INT(11) NOT NULL,
	home_page_id INT(11) NOT NULL,
	image_name VARCHAR(255),
	image_source VARCHAR(255),
	-- image_data BLOB,
	header VARCHAR(255),
	description TEXT,
	price DECIMAL(6,2),
	active BOOLEAN DEFAULT 1,
	created_at DATETIME NOT NULL DEFAULT NOW(),
	updated_at DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
	PRIMARY KEY (id),
	FOREIGN KEY (office_id) REFERENCES offices(id),
	FOREIGN KEY (home_page_id) REFERENCES home_pages(id)
)

-- Thumbnails
CREATE TABLE home_page_thumbnails (
	id INT NOT NULL AUTO_INCREMENT,
	office_id INT(11) NOT NULL,
	home_page_id INT(11) NOT NULL,
	image_name VARCHAR(255),
	image_source VARCHAR(255),
	-- image_data BLOB,
	active BOOLEAN DEFAULT 1,
	created_at DATETIME NOT NULL DEFAULT NOW(),
	updated_at DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
	PRIMARY KEY (id),
	FOREIGN KEY (office_id) REFERENCES offices(id),
	FOREIGN KEY (home_page_id) REFERENCES home_pages(id)
)

/*--------
About View
--------*/
-- Page
CREATE TABLE about_pages (
	id INT NOT NULL AUTO_INCREMENT,
	office_id INT(11) NOT NULL,
	has_header BOOLEAN,
	image_name VARCHAR(255),
	image_source VARCHAR(255),
	-- image_data BLOB,
	has_title BOOLEAN,
	title VARCHAR(255),
	has_description BOOLEAN,
	description TEXT,
	about_limit INT(11) DEFAULT 1,
	created_at DATETIME NOT NULL DEFAULT NOW(),
	updated_at DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
	PRIMARY KEY (id),
	FOREIGN KEY (office_id) REFERENCES offices(id)
)

-- Abouts
CREATE TABLE abouts (
	id INT NOT NULL AUTO_INCREMENT,
	office_id INT(11) NOT NULL,
	about_page_id INT(11) NOT NULL,
	has_image BOOLEAN,
	image_name VARCHAR(255),
	image_source VARCHAR(255),
	-- image_data BLOB,
	title VARCHAR(255),
	description TEXT,
	active BOOLEAN DEFAULT 1,
	created_at DATETIME NOT NULL DEFAULT NOW(),
	updated_at DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
	PRIMARY KEY (id),
	FOREIGN KEY (office_id) REFERENCES offices(id),
	FOREIGN KEY (about_page_id) REFERENCES about_pages(id)
)

/*-----------
Services View
-----------*/
CREATE TABLE services_pages (
	id INT NOT NULL AUTO_INCREMENT,
	office_id INT(11) NOT NULL,
	has_header BOOLEAN,
	image_name VARCHAR(255),
	image_source VARCHAR(255),
	-- image_data BLOB,
	has_title BOOLEAN,
	title VARCHAR(255),
	has_description BOOLEAN,
	description TEXT,
	services_limit INT(11) DEFAULT 6,
	created_at DATETIME NOT NULL DEFAULT NOW(),
	updated_at DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
	PRIMARY KEY (id),
	FOREIGN KEY (office_id) REFERENCES offices(id)
)

-- Services
CREATE TABLE services (
	id INT NOT NULL AUTO_INCREMENT,
	office_id INT(11) NOT NULL,
	services_page_id INT(11) NOT NULL,
	has_image BOOLEAN,
	image_name VARCHAR(255),
	image_source VARCHAR(255),
	-- image_data BLOB,
	header VARCHAR(255),
	description TEXT,
	active BOOLEAN DEFAULT 1,
	created_at DATETIME NOT NULL DEFAULT NOW(),
	updated_at DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
	PRIMARY KEY (id),
	FOREIGN KEY (office_id) REFERENCES offices(id),
	FOREIGN KEY (services_page_id) REFERENCES services_pages(id)
)

/*----------
Gallery View
----------*/
-- Page
CREATE TABLE gallery_pages (
	id INT NOT NULL AUTO_INCREMENT,
	office_id INT(11) NOT NULL,
	has_header BOOLEAN,
	image_name VARCHAR(255),
	image_source VARCHAR(255),
	-- image_data BLOB,
	has_title BOOLEAN,
	title VARCHAR(255),
	has_description BOOLEAN,
	description TEXT,
	display_captions BOOLEAN,
	image_limit INT(11) DEFAULT 12,
	created_at DATETIME NOT NULL DEFAULT NOW(),
	updated_at DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
	PRIMARY KEY (id),
	FOREIGN KEY (office_id) REFERENCES offices(id)
)

-- Images
CREATE TABLE gallery_images (
	id INT NOT NULL AUTO_INCREMENT,
	office_id INT(11) NOT NULL,
	gallery_page_id INT(11) NOT NULL,
	image_name VARCHAR(255),
	image_source VARCHAR(255),
	-- image_data BLOB,
	active BOOLEAN DEFAULT 1,
	created_at DATETIME NOT NULL DEFAULT NOW(),
	updated_at DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
	PRIMARY KEY (id),
	FOREIGN KEY (office_id) REFERENCES offices(id),
	FOREIGN KEY (gallery_page_id) REFERENCES gallery_pages(id)
)

/*---------
Offers View
---------*/
CREATE TABLE offer_pages (
	id INT NOT NULL AUTO_INCREMENT,
	office_id INT(11) NOT NULL,
	has_header BOOLEAN,
	image_name VARCHAR(255),
	image_source VARCHAR(255),
	-- image_data BLOB,
	has_title BOOLEAN,
	title VARCHAR(255),
	has_description BOOLEAN,
	description TEXT,
	offer_limit INT(11) DEFAULT 4,
	created_at DATETIME NOT NULL DEFAULT NOW(),
	updated_at DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
	PRIMARY KEY (id),
	FOREIGN KEY (office_id) REFERENCES offices(id)
)

-- Offers
CREATE TABLE offers (
	id INT NOT NULL AUTO_INCREMENT,
	office_id INT(11) NOT NULL,
	offer_page_id INT(11) NOT NULL,
	image_name VARCHAR(255),
	image_source VARCHAR(255),
	-- image_data BLOB,
	header VARCHAR(255),
	description TEXT,
	price DECIMAL(6,2),
	active BOOLEAN DEFAULT 1,
	created_at DATETIME NOT NULL DEFAULT NOW(),
	updated_at DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
	PRIMARY KEY (id),
	FOREIGN KEY (office_id) REFERENCES offices(id),
	FOREIGN KEY (offer_page_id) REFERENCES offer_pages(id)
)

/*----------
Contact View
----------*/
CREATE TABLE contact_pages (
	id INT NOT NULL AUTO_INCREMENT,
	office_id INT(11) NOT NULL,
	has_header BOOLEAN,
	image_name VARCHAR(255),
	image_source VARCHAR(255),
	-- image_data BLOB,
	has_title BOOLEAN,
	title VARCHAR(255),
	has_description BOOLEAN,
	description TEXT,
	show_email BOOLEAN,
	show_phone BOOLEAN,
	show_hours BOOLEAN,
	show_map BOOLEAN,
	show_form BOOLEAN,
	created_at DATETIME NOT NULL DEFAULT NOW(),
	updated_at DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
	PRIMARY KEY (id),
	FOREIGN KEY (office_id) REFERENCES offices(id)
)

/*------------
Financing View
------------*/
CREATE TABLE financing_pages (
	id INT NOT NULL AUTO_INCREMENT,
	office_id INT(11) NOT NULL,
	has_header BOOLEAN,
	image_name VARCHAR(255),
	image_source VARCHAR(255),
	-- image_data BLOB,
	has_title BOOLEAN,
	title VARCHAR(255),
	has_description BOOLEAN,
	description TEXT,
	accepts_amex BOOLEAN,
	accepts_discover BOOLEAN,
	accepts_master_card BOOLEAN,
	accepts_visa BOOLEAN,
	accepts_care_credit BOOLEAN,
	policy_limit INT(11) DEFAULT 4,
	created_at DATETIME NOT NULL DEFAULT NOW(),
	updated_at DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
	PRIMARY KEY (id),
	FOREIGN KEY (office_id) REFERENCES offices(id)
)

-- Policies
CREATE TABLE finance_policies (
	id INT NOT NULL AUTO_INCREMENT,
	office_id INT(11) NOT NULL,
	financing_page_id INT(11) NOT NULL,
	title VARCHAR(255),
	description TEXT,
	active BOOLEAN DEFAULT 1,
	created_at DATETIME NOT NULL DEFAULT NOW(),
	updated_at DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),
	PRIMARY KEY (id),
	FOREIGN KEY (office_id) REFERENCES offices(id),
	FOREIGN KEY (financing_page_id) REFERENCES financing_pages(id)
)