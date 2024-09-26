<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { PageData } from './$types';
	import { fileProxy, superForm } from 'sveltekit-superforms';
	import { fileSchema } from '$lib/common/schemas';
	import * as Form from '$lib/components/ui/form';
	export let data: PageData;

	let isLoading: boolean = false;

	const spForm = superForm(data.form, {
		validators: zodClient(fileSchema),
		onSubmit: () => {
			isLoading = true;
		}
	});

	const { form: formData, enhance, errors } = spForm;

	const file = fileProxy(spForm, 'file');
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
			<Input accept=".xlsx" type="file" {...attrs} bind:files={$formData.file} />
		</Form.Control>
		<Form.Description>Upload file you want to work on.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	{#if isLoading}
		<Form.Button>Loading...</Form.Button>
	{:else}
		<Form.Button>Submit</Form.Button>
	{/if}
</form>
