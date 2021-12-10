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

    const date = new Date()
    const datePart = buildDatePart(date)

    const existingTags = await listTags()
    const newMicro = nextAvailableMicro(datePart, existingTags)

    const tag = buildTag(date, newMicro)

    core.info(`Creating tag ${tag} for commit ${sha}`)

    await createTag(tag, sha)
    core.setOutput('tag', tag)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
