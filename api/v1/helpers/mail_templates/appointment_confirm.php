<?php
return <<<'EOD'
Dear $to,

Thank you for contacting $from! Your appointment has been confirmed succesfully. Please review the details below:

	Date: $date
	Time: $time
	Treatment: $treatment

If you have any questions or concerns, do not hesitate to reach out to us at
T: $phone | E: $email
$address

We look forward to seeing you!
$from
EOD;
?>