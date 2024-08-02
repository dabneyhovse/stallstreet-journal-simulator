<script>
    // Define the LoadingScreen component
    export let isLoading = true;
</script>

<style>
    .loading-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #000;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
    }
</style>

{#if isLoading}
    <div class="loading-screen">
        <h1>Loading...</h1>
    </div>
{/if}