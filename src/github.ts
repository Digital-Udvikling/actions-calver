/**
 * This file is heavily based on https://github.com/mathieudutour/github-tag-action
 */
import * as core from '@actions/core'
import {context, getOctokit} from '@actions/github'
import {ITags} from './types'

let octokitSingleton: ReturnType<typeof getOctokit>

function getOctokitSingleton(): ReturnType<typeof getOctokit> {
  if (octokitSingleton) {
    return octokitSingleton
  }
  const githubToken = core.getInput('github_token')
  octokitSingleton = getOctokit(githubToken)
  return octokitSingleton
}

export async function listTags(
  fetchedTags: ITags = [],
  page = 1
): Promise<ITags> {
  const octokit = getOctokitSingleton()
  core.info(`Fetching tags (page: ${page})...`)
  const tags = await octokit.rest.repos.listTags({
    ...context.repo,
    per_page: 100,
    page
  })

  if (tags.data.length < 100) {
    return [...fetchedTags, ...tags.data]
  }

  return listTags([...fetchedTags, ...tags.data], page + 1)
}

export async function createTag(newTag: string, sha: string): Promise<unknown> {
  const octokit = getOctokitSingleton()
  const annotatedTag = await octokit.rest.git.createTag({
    ...context.repo,
    tag: newTag,
    message: newTag,
    object: sha,
    type: 'commit'
  })

  return octokit.rest.git.createRef({
    ...context.repo,
    ref: `refs/tags/${newTag}`,
    sha: annotatedTag.data.sha
  })
}
