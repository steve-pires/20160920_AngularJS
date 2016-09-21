<?php include( "../php/connect.php"); ?>
<?php
//sleep( 3);
//récupération de la  catégorie sélectionnée
$strXml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>";
$strXml .= "<produits>";
$prm_id_cat = "";

if( isSet( $_GET['id_cat'])) {
	$prm_id_cat = $_GET['id_cat'];
}

//- listing produit -
//---------------------
$req = "SELECT * FROM produits";
$req_where = "";

//si une catégorie est sélectionnée
if( ( $prm_id_cat != "") && ( $prm_id_cat != "0"))
{
	$req_where = $req_where." WHERE id_categorie = ".$prm_id_cat;
}

//si on recherche une chaine
$prm_search = "";
if( isSet( $_GET['search'])) {
	$prm_search = $_GET['search'];
}

if( $prm_search != "")
{
	if( $req_where == "") $req_where = " WHERE nom LIKE '%".$prm_search."%'";
	else $req_where = $req_where." AND nom LIKE '%".$prm_search."%'";
}

//si on recherche une chaine au début
$prm_begin = "";
if( isSet( $_GET['begin'])) {
	$prm_begin = $_GET['begin'];
}

if( $prm_begin != "")
{
	if( $req_where == "") $req_where = " WHERE nom LIKE '".$prm_begin."%'";
	else $req_where = $req_where." AND nom LIKE '".$prm_begin."%'";
}


// génération de la liste des produits
$req = $req.$req_where;
//echo( $req);//!debug!
$res = mysql_query( $req, $connexion);
	
if( mysql_numrows( $res))
{
	for( $i = 0; $i < mysql_numrows($res); $i++)
	{
		$rcd = mysql_fetch_array ($res);
		
		$strXml .= "<produit>";
		$strXml .= "<id>".$rcd["id"]."</id>";
		$strXml .= "<id_cat>".$rcd["id_categorie"]."</id_cat>";
		$strXml .= "<nom>".$rcd["nom"]."</nom>";
		$strXml .= "<desc>".$rcd["desc"]."</desc>";
		$strXml .= "<prix>".$rcd["prix"]."</prix>";
		$strXml .= "<image>".$rcd["image"]."</image>";
		$strXml .= "</produit>";
	}
}

$strXml .= "</produits>";

header('Content-Type: text/xml');

echo( utf8_encode( $strXml));
?>
