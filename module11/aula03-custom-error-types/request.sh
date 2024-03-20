echo $'\n\n[requesting: normal request]'
curl -i localhost:3000 -X POST --data '{"name": "Avenger", "age": 80}'

echo $'\n\n[requesting: wrong age]'
curl -i localhost:3000 -X POST --data '{"name": "Avenger", "age": 18}'

echo $'\n\n[requesting: wrong name]'
curl -i localhost:3000 -X POST --data '{"name": "V", "age": 80}'

echo $'\n\n[requesting: connection error]'
curl -i localhost:3000 -X POST --data '{"connectionError": "V"}'
