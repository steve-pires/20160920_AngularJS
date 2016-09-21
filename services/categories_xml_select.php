<?php include( "../php/connect.php"); ?>
<?php
$strXml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>";
$strXml .= "<categories>";

$req = "SELECT * FROM categories";
$res = mysql_query( $req, $connexion);
	
if( mysql_numrows( $res))
{
	for( $i = 0; $i < mysql_numrows($res); $i++)
	{
		$rcd = mysql_fetch_array ($res);
		
		$strXml .= "<categorie>";
		$strXml .= "<id>".$rcd["id"]."</id>";
		$strXml .= "<nom>".$rcd["nom"]."</nom>";
		$strXml .= "<desc>".$rcd["desc"]."</desc>";
		$strXml .= "</categorie>";
	}
}

$strXml .= "</categories>";
header('Content-Type: text/xml');
echo( utf8_encode($strXml));
?>
