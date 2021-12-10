import {buildDatePart, nextAvailableMicro, buildTag} from '../src/tag'
import {expect, test} from '@jest/globals'
import {ITag} from "../src/types";


function buildTagObj(name: string): ITag {
  return {
    name,
    commit: {
      sha: '',
      url: '',
    },
    zipball_url: '',
    tarball_url: '',
    node_id: ''
  }
}

test('Build date part', () => {
  expect(buildDatePart(new Date(2020, 0, 1))).toEqual('2020.01.01')
})

test('get nextAvailableMicro with no tags', () => {
  expect(nextAvailableMicro('1970.01.01', [])).toEqual(1)
})

test('get nextAvailableMicro with no matching tags', () => {
  expect(nextAvailableMicro('1970.01.02', [buildTagObj('1970.01.01-01')])).toEqual(1)
})

test('get nextAvailableMicro with matching tags', () => {
  expect(nextAvailableMicro('1970.01.01', [buildTagObj('1970.01.01-01')])).toEqual(2)
  expect(nextAvailableMicro('1970.01.01', [buildTagObj('1970.01.01-01'), buildTagObj('1970.01.01-02')])).toEqual(3)
})

test('Build new tag', () => {
  expect(buildTag(new Date(2020, 0, 1), 1)).toEqual('2020.01.01-01')
})