<script>
  import { Suspense, Text } from '@threlte/extras'
  import Ssj from './models/ssj.svelte'
  import { T } from '@threlte/core'
  import CameraControls from './CameraControls.svelte'
  import { cameraControls } from './stores.js'
  import PosterManager from './PosterManager.svelte'
  import posters from '$lib/stallstreets.json'
  import { tweened } from 'svelte/motion'
  import { onMount } from 'svelte'
  import { Euler, Vector3 } from 'three'
  import Poop from './Poop.svelte'

  let cam

  let rotation = tweened(0)
  onMount(() => {
    // This function will update the rotation in a loop
    function spin() {
      rotation.update(r => r + 0.01)
      requestAnimationFrame(spin)
    }
    spin()
  })

  const EPS = 1e-5

  const getId = () => {
      return Math.random().toString(16).slice(2)
  }

  const getRandomRotation = () => {
      return new Euler(Math.random() * 10, Math.random() * 10, Math.random() * 10)
  }

  let bodies = []

  $: console.log(bodies)

  function addPoop() {
      bodies = [{
          id: getId(),
          position: new Vector3(0, 0.6, 0),
          rotation: getRandomRotation()
      }, ...bodies]
    }

</script>

<T.AmbientLight intensity={0} />
<T.HemisphereLight
  intensity={4}
/>

<T.Group>
  <T.PerspectiveCamera
    makeDefault
    fov={100}
    position={[0, .8, 0]}
    bind:ref={cam}
  >
    <CameraControls
      on:create={({ ref }) => {
        $cameraControls = ref
        $cameraControls.azimuthRotateSpeed = - 0.3 // negative value to invert rotation direction
        $cameraControls.polarRotateSpeed   = - 0.3 // negative value to invert rotation direction
        $cameraControls.truckSpeed = 10
        $cameraControls.dollySpeed = 0
        $cameraControls.setOrbitPoint(0, .8, EPS)
        $cameraControls.lookInDirectionOf(0, 1, 5)
      }}
    />
  </T.PerspectiveCamera>
</T.Group>

<Suspense final>
  <Text text={"Loading..."} position={[0, 1, 1]} rotation={[0, Math.PI+$rotation, 0]} anchorX="center" anchorY="middle" slot="fallback" />
  <Ssj on:poop={addPoop} />
  <PosterManager
    posters={posters} />
  {#each bodies as body (body.id)}
    <Poop
      position={body.position}
      rotation={body.rotation}
    />
  {/each}
</Suspense>