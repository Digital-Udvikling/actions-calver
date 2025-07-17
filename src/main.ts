import * as core from '@actions/core'
import {buildDatePart, buildTag, nextAvailableMicro} from './tag'
import {createTag, listTags} from './github'

async function run(): Promise<void> {
  try {
    const sha = process.env.GITHUB_SHA

    if (!sha) {
      core.setFailed('Missing commit_sha or GITHUB_SHA.')
      return
    }

    const prefix = core.getInput('prefix-tag')
    const date = new Date()
    const datePart = buildDatePart(date)

    const existingTags = await listTags()
    const newMicro = nextAvailableMicro(datePart, existingTags, prefix)

    const tag = buildTag(date, newMicro)
    const gitTag = prefix ? `${prefix}${tag}` : tag

    core.info(`Creating tag ${gitTag} for commit ${sha}`)

    await createTag(gitTag, sha)
    core.setOutput('tag', tag)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
