<?php
namespace MainApp\Controllers;

use Core\Controller;

class IndexController extends Controller {
	function __construct($pagedata=[]){
		 parent::__construct($pagedata);
	}
    public function index() {
		$vars = [];
		$vars['mytasks_b'] = 'ПОКА!';
		$extra_vars = [];
		$extra_vars['authorconentblock'] = 'ПРИВЕТ!!!!!!';
		
		//var_dump($extra_vars);
		
		//$this->baseTemplate = '';
		
		$this->render();
		//$this->render($extra_vars);
		
		/*
		$template,
		$vars = [],
		$extra_vars = [],
		$page_not_found = false,
		$xmlhttp_request = false,
		$get_main_block_only = false,
		$reload_page = false
		*/
		
        //echo "Home Page";
    }
}