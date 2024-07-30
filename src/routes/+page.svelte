<script lang="ts">
  import { runCompletion, generateTableFromObject, objectToMarkdown } from '$lib/inference'
  import Markdown from 'svelte-exmarkdown'

  let md = ''

  async function getIt() {
    let res = await runCompletion(
      'What steps to take when planning a family vacation. For each step, include example web queries which could be used to achieve the step. Respond using JSON.'
    )
    md = objectToMarkdown(JSON.parse(res.response))
    console.log(md)
  }
</script>

<template lang="pug">
	.container
		button(on:click="{getIt}") Do It
		hr
		Markdown({md})
		textarea(bind:value="{md}")
</template>
