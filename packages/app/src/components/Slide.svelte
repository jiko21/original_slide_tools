<script lang="ts">
	export let item = '';
	export let isActive: boolean = false;
</script>

<div
	class="box-border h-screen w-screen p-6 print:visible print:block print:p-0"
	class:block={isActive}
	class:hidden={!isActive}
>
	<div class="aspect-video h-auto max-h-full w-auto max-w-full bg-white print:h-full print:w-full">
		{@html item}
	</div>
</div>
