<?php
return [
    [
        'id_page' => 1,  
        'method' => 'GET',
        'path' => '/user/{id}',
        'controller' => [MainApp\Controllers\UserController::class, 'index'],
        'template' => null,
		'contentfile'=>null,
        'parent_id_page' => null,
		'needauth' => null,
        'layer' => 1  
    ],
    [			
        'id_page' => 2,  
        'method' => 'GET',
        'path' => '/',
        'controller' => [MainApp\Controllers\IndexController::class, 'index'],
        'template' => null,
		'contentfile'=>null,
        'parent_id_page' => null,
		'needauth' => null,
        'layer' => 1  
    ],
    [
        'id_page' => 3,  
        'method' => 'GET',
        'path' => '/дом',
        'controller' => ['home', 'index'],
        'middlewares' => [Core\Middlewares\AuthMiddleware::class, 'handleRequest'],
        'template' => null,
		'contentfile'=>null,
        'parent_id_page' => 2,
		'needauth' => true,
        'layer' => 2  
    ],
    [
        'id_page' => 4,  
        'method' => 'GET',
        'path' => '/test/test/test',
        'controller' => ['', 'index'],
        'middlewares' => [Core\Middlewares\AuthMiddleware::class, 'handleRequest'],
        'template' => null,
		'contentfile'=>null,
        'parent_id_page' => 3,
		'needauth' => null,
        'layer' => 3  
    ],
	 [
        'id_page' => 5,  
        'method' => 'GET',
        'path' => '/test',
        'controller' => ['test', 'index'],
        'middlewares' => [Core\Middlewares\AuthMiddleware::class, 'handleRequest'],
        'template' => null,
		'contentfile'=>null,
        'parent_id_page' => 0,
		'needauth' => null,
        'layer' => 1  
    ]
];