<script lang="ts">
	import { excelToJson } from '$lib/common/utils';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { toast } from 'svelte-sonner';
	import { fileData } from '$lib/client/stores/fileData';
	import type { JsonData } from '$lib/types';
	import { getFileHeaderRows } from '$lib/client/utils';

	export let data: PageData;
	let headers: string[] = [];
	let isLoading = false;

	onMount(async () => {
		isLoading = true;

		try {
			$fileData = (await excelToJson(data.data)) as JsonData;
			headers = getFileHeaderRows($fileData);
		} catch (error) {
			console.error(error);
			toast.error('Something went wrong could not open file');
		} finally {
			isLoading = false;
		}
	});
</script>

<h1>{isLoading ? 'loading..' : `we have data ${$fileData.length} with ${headers.length}`}</h1>
