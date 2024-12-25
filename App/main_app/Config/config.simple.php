<?php
//
define('URI_FIXER', '');

define('POSTGRESQL_HOST', 'localhost');
define('POSTGRESQL_NAME', 'name');
define('POSTGRESQL_USER', 'user');
define('POSTGRESQL_PASS', 'password');

define('MYSQL_HOST', 'localhost');
define('MYSQL_NAME', 'name');
define('MYSQL_USER', 'user');
define('MYSQL_PASS', 'password');

define('SQLi_PATH',  dirname( ROOT.'core/app/config.php' ).'/ClassSQLi/SQLi_DB/' );
define('SQLi_NAME', 'site.db');
define('SQLi_USER', 'user');
define('SQLi_PASS', 'password');

// Адрес АД
define( 'AD_SERVER_IP', '255.255.255.255' );
define( 'AD_SERVER_IP2', '255.255.255.255' );
define( 'AD_DOMAIN', 'domain1' );
define( 'AD_DOMAIN2', 'domain2' );

// Страница авторизации (если пользователь не авторизован)
define('AUTH_PATH','/auth');

// project_db=> Mssql Mysql Postgre SQLi NoDB
return (object) array(
	'defaultMiddlewares'=>[ ['Middlware','Method'] ],
    'project_db' => 'Postgre'
);
