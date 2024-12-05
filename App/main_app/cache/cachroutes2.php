<?php return [ 
  [
    'id' => 1,'path' => '/user/{id}','method' => 'GET','controller' => 
    [ 'MainApp\\Controllers\\UserController','index'],'basetemplate' => NULL,'contentfile' => NULL,'middlewares' => 
    [],'needauth' => false],[
    'id' => 2,'path' => '/','method' => 'GET','controller' => 
    [ 'MainApp\\Controllers\\IndexController','index'],'basetemplate' => NULL,'contentfile' => NULL,'middlewares' => 
    [],'needauth' => false],[
    'id' => 3,'path' => '/дом','method' => 'GET','controller' => 
    [ 'home','index'],'basetemplate' => NULL,'contentfile' => NULL,'middlewares' => 
    [],'needauth' => true],['id' => 4,'path' => '/test/test/test','method' => 'GET','controller' => 
    [ '','index'],'basetemplate' => NULL,'contentfile' => NULL,'middlewares' => 
    [],'needauth' => false],[
    'id' => 5,'path' => '/@user{id}','method' => 'GET','controller' => 
    [ 'test4','index'],'basetemplate' => NULL,'contentfile' => NULL,'middlewares' => 
    [
    ],'needauth' => false]];