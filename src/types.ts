// eslint-disable-next-line import/named
import {Endpoints} from '@octokit/types'

type Unboxed<T> = T extends (infer U)[] ? U : T

export type ITags =
  Endpoints['GET /repos/{owner}/{repo}/tags']['response']['data']

export type ITag = Unboxed<ITags>
