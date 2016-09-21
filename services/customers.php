<?php

class Customers{
	
	function x_query($cmd){			
			$database ="commerce";
			$host ="localhost";
			$user ="root";
			$pass ="";

		$db_conn =mysql_connect ($host,$user,$pass) or exit(mysql_error());
		mysql_select_db($database,$db_conn);
		$result = mysql_query($cmd) or exit(mysql_error());
		return  $result;
		mysql_free_result($result);
		mysql_close($db_conn);
	}
	
	function connect($login,$mdp){
		$sql = "SELECT * FROM users WHERE email = '".$login."' AND mdp = '".$mdp."'";
		$qu=$this->x_query($sql);
		if(mysql_num_rows($qu)==1){
			return "true";
		}else{
			return "false";
		}
	}
	
	function listing(){
		$sql = "SELECT * FROM users";
		$qu=$this->x_query($sql);
		$output = array();
		while($data=mysql_fetch_array($qu)){
		array_push($output,array('id'=>$data['id'],
								'nom'=>$data['nom'],
								'prenom'=>$data['prenom'],
								'genre'=>$data['genre'],
								'age'=>$data['age'],
								'adresse_IP'=>$data['adresse_IP'],
								'email'=>$data['email'],
								'photo'=>$data['photo'],
								'os'=>$data['os'],
								'amount'=>$data['amount']
								));
		}
		return $output ;		
	}
	
	function search($keywords){
		$sql = "SELECT * FROM users WHERE prenom LIKE '%".$keywords."%'";
		$qu=$this->x_query($sql);
		$output = array();
		while($data=mysql_fetch_array($qu)){
		array_push($output,array('id'=>$data['id'],
								'nom'=>$data['nom'],
								'prenom'=>$data['prenom'],
								'genre'=>$data['genre'],
								'age'=>$data['age'],
								'adresse_IP'=>$data['adresse_IP'],
								'email'=>$data['email'],
								'photo'=>$data['photo'],
								'os'=>$data['os'],
								'amount'=>$data['amount']
								));
		}
		return $output ;
	}
	
}
	
$wsdl	= 'customers.wsdl';
$server	= new SoapServer($wsdl);
$server->setClass('Customers');
$server->handle();
?>