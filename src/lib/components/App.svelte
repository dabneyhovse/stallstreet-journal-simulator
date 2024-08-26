<script>
  import { Canvas } from '@threlte/core'
  import { World } from '@threlte/rapier'
  import Scene from './Scene.svelte'
  import Credits from './Credits.svelte'
</script>

<Canvas>
  <World>
    <Scene />
  </World>
</Canvas>

<Credits />