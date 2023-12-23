import { deepStrictEqual } from 'assert'
import DateUtil from './index.js'
import exp from 'constants';

{
    const format = 'dd-M-Y'
    const expected = { error: `the format ${format} is not available yet :)`}
    const date = new Date(1990, 2, 1);
    const result =DateUtil.formatDate(date, format)
    deepStrictEqual(result, expected)
}

{
    const expected = '01-12-1990'
    const format = 'dd-mm-yyyy'
    const date = new Date('1990-12-01')
    const result = DateUtil.formatDate(date, format)
    deepStrictEqual(result, expected)
}

{
    const expected = '22/06/1995'
    const format = 'dd/mm/yyyy'
    const date = new Date('1995-06-22')
    const result = DateUtil.formatDate(date, format)
    deepStrictEqual(result, expected)
}

{
    const expected = '1996-08-22'
    const format = 'yyyy-mm-dd'
    const date = new Date('1996-08-22')
    const result = DateUtil.formatDate(date, format)
    deepStrictEqual(result, expected)
}

/// formatString

{
    const expected = { error: 'your text is empty'}
    const date = ''
    const result = DateUtil.formatString(date)
    deepStrictEqual(result, expected)
}

{
    const data = {
        value: '1990-april-01',
        format: 'yyyy-M-dd'
    }

    const expected = { error: `the format ${data.format} is not available yet :( )`}

    const result = DateUtil.formatString(data.value, data.format)
    deepStrictEqual(result, expected)
}

{
    const data = {
        value: '1990-01-01',
        format: 'yyyy-mm-dd'
    }
    const expectedFormat = 'dd/M/yyyy'

    const expected = { error: `the format ${expectedFormat} is not available yet :( )`}

    const result = DateUtil.formatString(data.value, data.format, expectedFormat)
    deepStrictEqual(result, expected)
}

{
    const data = {
        value: '1990-01-01',
        format: 'yyyy-mm-dd'
    }
    const expectedFormat = 'dd-mm-yyyy'

    const expected = '01-01-1990'
    const result = DateUtil.formatString(data.value, data.format, expectedFormat)
    deepStrictEqual(result, expected)
}

{
    const data = {
        value: ' 1 9 9 0 / 0 7 / 0 1 ',
        format: 'yyyy/mm/dd'
    }
    const expectedFormat = 'dd/mm/yyyy'

    const expected = '01/07/1990'
    const result = DateUtil.formatString(data.value, data.format, expectedFormat)
    deepStrictEqual(result, expected)
}

{
    const data = {
        value: ' 1 9 9 0 / 0 7 / 0 1 ',
        format: 'yyyy/mm/dd'
    }
    const expectedFormat = 'yyyy-mm-dd'

    const expected = '1990-07-01'
    const result = DateUtil.formatString(data.value, data.format, expectedFormat)
    deepStrictEqual(result, expected)
}

{
    const data = {
        value: ' 1 8 / 0 8 / 1 9 9 5  ',
        format: 'dd/mm/yyyy'
    }
    const expectedFormat = 'yyyy-mm-dd'

    const expected = '1995-08-18'
    const result = DateUtil.formatString(data.value, data.format, expectedFormat)
    deepStrictEqual(result, expected)
}