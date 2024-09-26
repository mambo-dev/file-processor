<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { PageData } from './$types';
	import { fileProxy, superForm } from 'sveltekit-superforms';
	import { fileSchema } from '$lib/common/schemas';
	import * as Form from '$lib/components/ui/form';
	export let data: PageData;

	const spForm = superForm(data.form, {
		validators: zodClient(fileSchema),
		delayMs: 100,
		timeoutMs: 5000,
		onSubmit: () => {},
		onResult: () => {}
	});

	const { form: formData, enhance, errors, delayed, submitting, timeout } = spForm;

	const file = fileProxy(spForm, 'file');

	function handleFileInput(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.files && target.files.length > 0) {
			file.set(target.files[0]);
		}
	}
</script>

<form
	method="POST"
	enctype="multipart/form-data"
	use:enhance
	class="flex items-center justify-center flex-col mx-auto max-w-md mt-20"
>
	<Form.Field form={spForm} name="file">
		<Form.Control let:attrs>
			<Form.Label>File</Form.Label>
			<Input accept=".xlsx" type="file" {...attrs} on:change={handleFileInput} />
		</Form.Control>
		<Form.Description>Upload file you want to work on.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	{#if $delayed}
		<Form.Button>Processing...</Form.Button>
	{:else if $timeout}
		<Form.Button>This may take a while...</Form.Button>
	{:else}
		<Form.Button>Submit</Form.Button>
	{/if}
</form>
