// terminal:
// curl "localhost:3000?salary=3000&discount=15"

import http from 'http'

function netSalary({ discount, salary }) {
    const percent = (discount / 100)
    const cost = salary * percent
    const result = salary - cost

    return result
}

http.createServer((req, res) => {
    const url = req.url.replace('/', '')
    const params = new RLSearchParams(url)
    const data = Object.fromEntries(params)
    const result = netSalary(data)

    res.end(`Your final salary is ${ result }`)
})
.listen(3000, () => console.log('app running at 3000')) 