# run this bash with
# bash run.sh             

# localhost:3000/joinImages?img=https://images.tcdn.com.br/img/img_prod/460977/boneco_tracker_predator_predador_predadores_predators_escala_1_6_mms147_hot_toys_cg_43510_1_20190427140400.png&background=https://wallpapers.com/images/hd/post-apocalyptic-2qaak8am8soyjqvw.jpg

IMAGE_URL="https://images.tcdn.com.br/img/img_prod/460977/boneco_tracker_predator_predador_predadores_predators_escala_1_6_mms147_hot_toys_cg_43510_1_20190427140400.png"
BACKGROUND_URL="https://wallpapers.com/images/hd/post-apocalyptic-2qaak8am8soyjqvw.jpg"
curl "http://localhost:3000/joinImages?img=$IMAGE_URL&background=$BACKGROUND_URL"
# volume testing

# For load tests
# npm i -D autocannon
npx autocannon --renderStatusCodes -c500 "http://localhost:3000/joinImages?img=$IMAGE_URL&background=$BACKGROUND_URL"