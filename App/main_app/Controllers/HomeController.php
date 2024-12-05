<?php
namespace MainApp\Controllers;

use Core\Controller;

class HomeController extends Controller {
	function __construct($pagedata=[]){
		 parent::__construct($pagedata);
	}
    public function index() {		
		$vars = [];
		$vars['mytasks_b'] = 'ПОКА!';
		$extra_vars = [];
		$extra_vars['authorconentblock'] = 'ПРИВЕТ!!!!!!';
		$this->render($extra_vars);
    }
}