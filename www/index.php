<?php 
declare(strict_types=1);

// Тут поменять на 0
 ini_set('display_errors', 1);
 ini_set('display_startup_errors', 1);
 error_reporting(E_ALL);
 
 header('Content-Type: text/html; charset=utf-8');
 if (function_exists('header_remove')){
 header_remove('X-Powered-By');
 } else {
 @ini_set('expose_php', 'off');
 }
 header('X-XSS-Protection: 1; mode=block');
 header('Strict-Transport-Security: max-age=7776000');
 header('X-Frame-Options: deny');
 //header('X-Frame-Options: SAMEORIGIN');
 header('Referrer-Policy: strict-origin-when-cross-origin');
 header('X-Content-Type-Options: nosniff');
 header('x-permitted-cross-domain-policies:none');
 header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
 header('Cache-Control: post-check=0, pre-check=0', false);
 header('Pragma: no-cache');	
 //header('Access-Control-Allow-Origin: *');
 
 date_default_timezone_set('Europe/Moscow');
 
 // Определение констант
 define( '_SKEY', 1 );
 ignore_user_abort(true);
 define('ROOT', dirname(__DIR__) . DIRECTORY_SEPARATOR);
 define('APP', ROOT. 'App/main_app' . DIRECTORY_SEPARATOR);
 define('TEMPLATES', APP . 'Templates' . DIRECTORY_SEPARATOR);
 define('MAILER', ROOT. 'Core/' . 'phpmailer' . DIRECTORY_SEPARATOR);
 define('COUNTERS', ROOT. 'Core/' . 'counters' . DIRECTORY_SEPARATOR);
 define('SITE',ROOT. 'www'. DIRECTORY_SEPARATOR);
 define('PROJECT_PREFIX','');
 define('BASE_URL', '' );
 
 // Подключение автозагрузчика Composer
 require_once __DIR__.'/../vendor/autoload.php';
 
 use Core\Application;
 
 $app = new Application();
