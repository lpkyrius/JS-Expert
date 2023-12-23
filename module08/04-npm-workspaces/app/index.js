import DateUtil from '@lpkyrius/data-util'

console.log(DateUtil.formatDate(new Date('2023-12-23'), 'dd/mm/yyyy'))
console.log(DateUtil.formatString('2023-12-24', 'yyyy-mm-dd', 'dd-mm-yyyy'))