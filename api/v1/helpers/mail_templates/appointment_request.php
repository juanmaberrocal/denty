<?php
return <<<'EOD'
Dear $to,

Thank you for contacting $office_name! Your appointment request has been received. We will be reaching out to you shortly to confirm your booking.


Please review the details of your request below:

	Date: $date
	Time: $time
	Treatment: $treatment
	Phone: $phone
	Email: $email

If you have any questions or concerns, do not hesitate to reach out to us at:
T: $office_phone | E: $office_email
$office_address

We look forward to seeing you!
$office_name
EOD;
?>