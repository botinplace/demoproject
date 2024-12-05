<?php 
/*
function generateSequence($n) {
    $start = 100;
    $end = 1000;
    $sequence = [$start];

    if ($n == 1) {
        $sequence[] = $end;
    } else {
        // Находим шаг между элементами
        $step = ($end - $start) / ($n - 1);
        
        for ($i = 1; $i < $n - 1; $i++) {
            $nextValue = $sequence[$i - 1] + $step;
            $sequence[] = round($nextValue);
        }
        $sequence[] = $end;
    }

    return $sequence;
}

// Пример использования:
echo '<pre>';
for ($i = 2; $i <= 6; $i++) {
    print_r(generateSequence($i));
}
echo '</pre>';
*/

function generateSequence($n) {
    $start = 100;
    $end = 1000;

    $sequence = [$start];

    $intermediateValues = [
        1 => [],
        2 => [500],
        3 => [400, 750],
        4 => [250, 500, 750],
        5 => [225, 350, 500, 750],
    ];

    if (isset($intermediateValues[$n])) {
        $sequence = array_merge($sequence, $intermediateValues[$n]);
    }

    $sequence[] = $end;

    return $sequence;
}

echo '<pre>';
for ($i = 1; $i <= 5; $i++) {
    print_r(generateSequence($i));
}
echo '</pre>';