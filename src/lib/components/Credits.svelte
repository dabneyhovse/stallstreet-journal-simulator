<script>
    let showCredits = false;

    function toggleCredits() {
        showCredits = !showCredits;
    }
</script>

<style>
    .info-button {
        position: absolute;
        top: 10px;
        left: 10px;
        background: transparent;
        border: none;
        color: white;
        font-size: 1.5em;
        cursor: pointer;
        z-index: 1001; /* Higher than overlay to ensure it's clickable */
    }

    .info-button.active {
        color: #ff6c0c;
    }

    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }

    .credits {
        background: rgba(0, 0, 0, 0.7);
        padding: 20px;
        border-radius: 10px;
        color: white;
        pointer-events: auto;
        font-family: Helvetica, sans-serif;
    }

    .credits small {
        font-size: 0.6em;
        color: gray;
    }
</style>

<div class="overlay">
    {#if showCredits}
        <div class="credits">
            <h3>Guutz Shitpost #37</h3>
            <p>I came up with this one on the toilet.</p>
            <p>WIP</p>
            <small><i>Aug 1, 2024</i></small>
        </div>
    {/if}
</div>

<button class="info-button" class:active={showCredits} on:click={toggleCredits} aria-label="Show credits">
    &#8505; <!-- Unicode character for an information icon -->
</button>