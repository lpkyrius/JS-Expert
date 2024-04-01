#  --warmup [-c 1 -d 3] \ run a sequence for 3 secs. Because some apps have a delay to the 1st requests
# then we send 500 connections 
# renderStatusCodes to know what will returns 200

# --------------------------------

# counting log.txt lines:
# cat log.txt | grep 23854 | wc -l
# result:  123994

URL=localhost:3000
npx autocannon $URL -m POST \
    --warmup [-c 1 -d 3] \
    --connections 500 \
    --pipeline 10 \
    --renderStatusCodes


# Without CLUSTER
# [leandropassoslpkyrius@LeandroPassos 03-cluster-nodejs (main ✗)]$ sh bench.sh
# Running 3s warmup @ http://localhost:3000
# 1 connections

# Running 10s test @ http://localhost:3000
# 500 connections


# ┌─────────┬───────┬───────┬───────┬────────┬──────────┬──────────┬─────────┐
# │ Stat    │ 2.5%  │ 50%   │ 97.5% │ 99%    │ Avg      │ Stdev    │ Max     │
# ├─────────┼───────┼───────┼───────┼────────┼──────────┼──────────┼─────────┤
# │ Latency │ 35 ms │ 42 ms │ 92 ms │ 115 ms │ 47.05 ms │ 29.63 ms │ 1309 ms │
# └─────────┴───────┴───────┴───────┴────────┴──────────┴──────────┴─────────┘
# ┌───────────┬─────────┬─────────┬─────────┬─────────┬─────────┬──────────┬─────────┐
# │ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg     │ Stdev    │ Min     │
# ├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼──────────┼─────────┤
# │ Req/Sec   │ 8,367   │ 8,367   │ 10,767  │ 12,047  │ 10,496  │ 1,006.13 │ 8,360   │
# ├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼──────────┼─────────┤
# │ Bytes/Sec │ 1.06 MB │ 1.06 MB │ 1.37 MB │ 1.53 MB │ 1.33 MB │ 128 kB   │ 1.06 MB │
# └───────────┴─────────┴─────────┴─────────┴─────────┴─────────┴──────────┴─────────┘
# ┌──────┬────────┐
# │ Code │ Count  │
# ├──────┼────────┤
# │ 200  │ 104947 │
# └──────┴────────┘

# Req/Bytes counts sampled once per second.
# # of samples: 10

# 105k requests in 10.05s, 13.3 MB read


# With CLUSTER (INCREASED FROM 105k requests TO 164k)  <<<<<<<<<<<<<<<<
# [leandropassoslpkyrius@LeandroPassos 03-cluster-nodejs (main ✗)]$ sh bench.sh
# Running 3s warmup @ http://localhost:3000
# 1 connections

# Running 10s test @ http://localhost:3000
# 500 connections


# ┌─────────┬──────┬───────┬───────┬────────┬──────────┬─────────┬────────┐
# │ Stat    │ 2.5% │ 50%   │ 97.5% │ 99%    │ Avg      │ Stdev   │ Max    │
# ├─────────┼──────┼───────┼───────┼────────┼──────────┼─────────┼────────┤
# │ Latency │ 7 ms │ 25 ms │ 94 ms │ 115 ms │ 30.47 ms │ 22.1 ms │ 221 ms │
# └─────────┴──────┴───────┴───────┴────────┴──────────┴─────────┴────────┘
# ┌───────────┬─────────┬─────────┬─────────┬─────────┬─────────┬──────────┬─────────┐
# │ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg     │ Stdev    │ Min     │
# ├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼──────────┼─────────┤
# │ Req/Sec   │ 12,391  │ 12,391  │ 16,007  │ 19,279  │ 16,326  │ 2,724.43 │ 12,384  │
# ├───────────┼─────────┼─────────┼─────────┼─────────┼─────────┼──────────┼─────────┤
# │ Bytes/Sec │ 1.57 MB │ 1.57 MB │ 2.03 MB │ 2.45 MB │ 2.07 MB │ 346 kB   │ 1.57 MB │
# └───────────┴─────────┴─────────┴─────────┴─────────┴─────────┴──────────┴─────────┘
# ┌──────┬────────┐
# │ Code │ Count  │
# ├──────┼────────┤
# │ 200  │ 163242 │
# └──────┴────────┘

# Req/Bytes counts sampled once per second.
# # of samples: 10

# 164k requests in 10.17s, 20.7 MB read


# [leandropassoslpkyrius@LeandroPassos 03-cluster-nodejs (main ✗)]$ cat log.txt | grep 29432 | wc -l
#    20420
# [leandropassoslpkyrius@LeandroPassos 03-cluster-nodejs (main ✗)]$ cat log.txt | grep 29428 | wc -l
#    20454
# [leandropassoslpkyrius@LeandroPassos 03-cluster-nodejs (main ✗)]$ cat log.txt | grep 29434 | wc -l
#    19829
# [leandropassoslpkyrius@LeandroPassos 03-cluster-nodejs (main ✗)]$ cat log.txt | grep 29433 | wc -l
#    38610
# [leandropassoslpkyrius@LeandroPassos 03-cluster-nodejs (main ✗)]$ cat log.txt | grep 29429 | wc -l
#    20315
# [leandropassoslpkyrius@LeandroPassos 03-cluster-nodejs (main ✗)]$ cat log.txt | grep 29431 | wc -l
#    20168
# [leandropassoslpkyrius@LeandroPassos 03-cluster-nodejs (main ✗)]$ cat log.txt | grep 29430 | wc -l
#    20533
# [leandropassoslpkyrius@LeandroPassos 03-cluster-nodejs (main ✗)]$ cat log.txt | grep 29435 | wc -l
#    20265
# [leandropassoslpkyrius@LeandroPassos 03-cluster-nodejs (main ✗)]$ node -p '20420+20454+19829+38610+20315+20533+20265' 
# 160426
# 164k > 160426 due to the warmup we run above.

# Now when we force errors to kill workers and cluster creates new ones
# Check that within 124k requests, only 498 errors occured

# [leandropassoslpkyrius@LeandroPassos 03-cluster-nodejs (main ✗)]$ sh bench.sh
# Running 3s warmup @ http://localhost:3000
# 1 connections

# Running 10s test @ http://localhost:3000
# 500 connections


# ┌─────────┬──────┬───────┬────────┬────────┬──────────┬──────────┬────────┐
# │ Stat    │ 2.5% │ 50%   │ 97.5%  │ 99%    │ Avg      │ Stdev    │ Max    │
# ├─────────┼──────┼───────┼────────┼────────┼──────────┼──────────┼────────┤
# │ Latency │ 9 ms │ 77 ms │ 285 ms │ 347 ms │ 95.74 ms │ 72.35 ms │ 639 ms │
# └─────────┴──────┴───────┴────────┴────────┴──────────┴──────────┴────────┘
# ┌───────────┬────────┬────────┬─────────┬─────────┬──────────┬──────────┬────────┐
# │ Stat      │ 1%     │ 2.5%   │ 50%     │ 97.5%   │ Avg      │ Stdev    │ Min    │
# ├───────────┼────────┼────────┼─────────┼─────────┼──────────┼──────────┼────────┤
# │ Req/Sec   │ 9,455  │ 9,455  │ 12,207  │ 15,399  │ 12,169.6 │ 1,670.75 │ 9,449  │
# ├───────────┼────────┼────────┼─────────┼─────────┼──────────┼──────────┼────────┤
# │ Bytes/Sec │ 1.2 MB │ 1.2 MB │ 1.55 MB │ 1.96 MB │ 1.55 MB  │ 212 kB   │ 1.2 MB │
# └───────────┴────────┴────────┴─────────┴─────────┴──────────┴──────────┴────────┘
# ┌──────┬────────┐
# │ Code │ Count  │
# ├──────┼────────┤
# │ 200  │ 121684 │
# └──────┴────────┘

# Req/Bytes counts sampled once per second.
# # of samples: 10

# 124k requests in 10.05s, 15.5 MB read
# 498 errors (0 timeouts)