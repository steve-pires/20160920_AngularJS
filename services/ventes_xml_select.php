<?php include( "../php/connect.php"); ?>
<?php
//récupération de la  catégorie sélectionnée
$strXml = "<?xml version=\"1.0\" encoding=\"iso-8859-1\"?>";
$strXml .= "<ventes>";
$prm_id_cat = "";

if( isSet( $_GET['id_cat'])) {
	$prm_id_cat = $_GET['id_cat'];
}

//- listing produit -
//---------------------
$req = "SELECT MONTH( ventes.date) AS calc_month, SUM( ventes_lignes.prix_negocie) AS calc_ca FROM ventes, ventes_lignes";
$req_where = " WHERE ventes.id = ventes_lignes.id_ventes GROUP BY MONTH( ventes.date)";
//on pourrait mettre des options de calcul différentes

// génération de la liste des produits
$req = $req.$req_where;
//echo( $req);//!debug!
$res = mysql_query( $req, $connexion);
	
if( mysql_numrows( $res))
{
	for( $i = 0; $i < mysql_numrows($res); $i++)
	{
		$rcd = mysql_fetch_array ($res);
		
		$strXml .= "<vente mois=\"".$rcd["calc_month"]."\" ca=\"".$rcd["calc_ca"]."\"/>";
	}
}

$strXml .= "</ventes>";

header('Content-Type: text/xml');

echo( $strXml);
?>
