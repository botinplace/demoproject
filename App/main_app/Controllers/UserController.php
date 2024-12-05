<?php
namespace MainApp\Controllers;

use Core\Controller;

class UserController extends Controller {
	function __construct(?array $pagedata=[]){
		 parent::__construct($pagedata);
	}

	public function index($id) {
		
		$id = (int)$id;

		if ($id <= 0) {
			throw new \InvalidArgumentException('ID должен быть положительным целым числом.');
		}
		
		$this->render([]);
    }
}