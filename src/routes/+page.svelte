<script lang="ts">
	import { onMount } from 'svelte';
	import Meteors from '$lib/components/magic/meteors/meteors.svelte';
	import NumberTicker from '$lib/components/magic/number-ticker/number-ticker.svelte';

	const USERNAME = 'SirYadav1';

	let stats = $state({ public_repos: 0, followers: 0, following: 0, totalStars: 0, loading: true });

	onMount(async () => {
		try {
			const res = await fetch(`https://api.github.com/users/${USERNAME}`);
			const data = await res.json();
			// repos starred by user as a proxy for "contributions" visibility
			const starRes = await fetch(`https://api.github.com/users/${USERNAME}/starred?per_page=1`);
			const linkHeader = starRes.headers.get('link') || '';
			let stars = 0;
			const match = linkHeader.match(/&page=(\d+)>; rel="last"/);
			if (match) stars = parseInt(match[1]);

			stats = {
				public_repos: data.public_repos ?? 0,
				followers: data.followers ?? 0,
				following: data.following ?? 0,
				totalStars: stars,
				loading: false
			};
		} catch (e) {
			stats.loading = false;
		}
	});
</script>

<svelte:head>
	<title>SirYadav1 — Portfolio</title>
	<meta name="description" content="Developer portfolio of SirYadav1 — Minecraft tooling, automation, and reverse-engineering." />
</svelte:head>

<main class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 py-24">
	<!-- Meteors animated background -->
	<div class="pointer-events-none absolute inset-0 overflow-hidden">
		<Meteors />
	</div>

	<div class="relative z-10 mx-auto max-w-3xl text-center">
		<p class="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">Developer · Builder · Reverse Engineer</p>
		<h1 class="bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-7xl">
			SirYadav1
		</h1>
		<p class="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
			I build Minecraft automation, anti-cheat research, and developer tooling. Passionate about
			systems, protocols, and clean code.
		</p>

		<div class="mt-10 flex flex-wrap items-center justify-center gap-4">
			<a
				href={`https://github.com/${USERNAME}`}
				target="_blank"
				rel="noreferrer"
				class="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
			>
				View GitHub
			</a>
			<a
				href={`https://github.com/${USERNAME}?tab=repositories`}
				target="_blank"
				rel="noreferrer"
				class="rounded-lg border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-accent"
			>
				Projects
			</a>
		</div>

		<!-- Animated GitHub stats -->
		<div class="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
			{#each [
				{ label: 'Repositories', value: stats.public_repos },
				{ label: 'Followers', value: stats.followers },
				{ label: 'Following', value: stats.following },
				{ label: 'Stars Given', value: stats.totalStars }
			] as stat}
				<div class="rounded-xl border border-border bg-card/50 p-5 backdrop-blur">
					<div class="text-3xl font-bold tabular-nums text-foreground">
						{#if stats.loading}
							<span class="text-muted-foreground">--</span>
						{:else}
							<NumberTicker value={stat.value} />
						{/if}
					</div>
					<div class="mt-1 text-xs uppercase tracking-wide text-muted-foreground">{stat.label}</div>
				</div>
			{/each}
		</div>
	</div>
</main>
