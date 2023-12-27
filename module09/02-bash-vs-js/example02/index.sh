docker run -p "8080:80" -d nginx 

#  we must wait before reach localhost
sleep .5

# silent mode to reduce verbose
curl --silent localhost:8080  

# filtering nginx
CONTAINER_ID=$(docker ps | grep nginx | awk '{print $1}')
echo logs
echo $CONTAINER_ID | xargs -I {id} docker logs {id}
echo rm
echo $CONTAINER_ID | xargs -I {id} docker rm -f {id}

# to check the time spent for this, use the command:
# time sh index.sh