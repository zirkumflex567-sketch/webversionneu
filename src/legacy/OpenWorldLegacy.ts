import * as THREE from 'three';
import { AssetManager } from '../game/AssetManager';
import { StoryManager } from '../game/StoryManager';
import { useStoryStore } from '../store/StoryStore';

export type BiomeType = 'wasteland' | 'street_racer' | 'elven' | 'scifi' | 'dungeon' | 'space' | 'glass_plains';

export interface ZoneDefinition {
  id: string;
  name: string;
  biome: BiomeType;
  center: THREE.Vector2; // X, Z coordinates in the world
  radius: number; // Size of the zone
  description: string;
  color: number; // For UI and fog tinting
}

export const OPEN_WORLD_ZONES: ZoneDefinition[] = [
  {
    id: 'zone_htown',
    name: 'H-Town Central',
    biome: 'street_racer',
    center: new THREE.Vector2(0, 0),
    radius: 1000,
    description: 'The Scrap Docks. Safe zone, drift tracks, and commerce.',
    color: 0x00ffaa,
  },
  {
    id: 'zone_verdant',
    name: 'The Verdant Anomaly',
    biome: 'elven',
    center: new THREE.Vector2(2000, -1500),
    radius: 1500,
    description: 'Lush magical forests hiding ancient ruins.',
    color: 0x22cc44,
  },
  {
    id: 'zone_silicon',
    name: 'The Silicon Peaks',
    biome: 'scifi',
    center: new THREE.Vector2(0, -3000),
    radius: 2000,
    description: 'Icy mountains piercing futuristic tech fortresses.',
    color: 0x33aaff,
  },
  {
    id: 'zone_abyssal',
    name: 'The Abyssal Rift',
    biome: 'dungeon',
    center: new THREE.Vector2(-2500, 500),
    radius: 1800,
    description: 'A hellish tear in the earth leading to lava-filled crypts.',
    color: 0xff3300,
  },
  {
    id: 'zone_orbit',
    name: 'Orbit Fall',
    biome: 'space',
    center: new THREE.Vector2(1500, 2500),
    radius: 2000,
    description: 'A toxic swamp graveyard of fallen starships.',
    color: 0x8800ff,
  },
  {
    id: 'zone_ash',
    name: 'The Ash Wastes',
    biome: 'wasteland',
    center: new THREE.Vector2(-1500, -1500),
    radius: 3000,
    description: 'Endless radiated deserts roamed by mutant warlords.',
    color: 0xffaa00,
  },
  {
    id: 'zone_glass',
    name: 'Sonnenglasweite',
    biome: 'glass_plains',
    center: new THREE.Vector2(4000, 4000),
    radius: 2500,
    description: 'A shimmering desert of jagged glass shards and blinding reflections.',
    color: 0xe9c46a,
  }
];

const gridSize = 10;
const blockSize = 80;
const roadWidth = 20;

export class OpenWorldManager {
  private scene: THREE.Scene;
  private currentZoneId: string | null = null;
  private zoneMeshes: Map<string, THREE.Group> = new Map();
  private ambientLight: THREE.AmbientLight;
  private dirLight: THREE.DirectionalLight;
  
  // Collision data for cities
  private occupiedBlocks: Set<string> = new Set();
  private cityBlockSize = 60;
  private cityBuildingSize = 40;
  private cityOffset = 0;
  
  // Interactive NPCs in the world
  private npcs: Map<string, { mesh: THREE.Group, id: string }> = new Map();
  private interactionRadius = 15;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    
    // Setup dynamic global lighting
    this.ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    this.scene.add(this.ambientLight);

    this.dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
    this.dirLight.position.set(500, 1000, 500);
    this.dirLight.castShadow = true;
    this.dirLight.shadow.mapSize.width = 4096;
    this.dirLight.shadow.mapSize.height = 4096;
    this.dirLight.shadow.camera.near = 10;
    this.dirLight.shadow.camera.far = 4000;
    const shadowSize = 1000;
    this.dirLight.shadow.camera.left = -shadowSize;
    this.dirLight.shadow.camera.right = shadowSize;
    this.dirLight.shadow.camera.top = shadowSize;
    this.dirLight.shadow.camera.bottom = -shadowSize;
    this.scene.add(this.dirLight);

    // Initial fog
    this.scene.fog = new THREE.FogExp2(0x2a2a3c, 0.002);
    this.scene.background = new THREE.Color(0x2a2a3c);
  }

  // Called every frame to handle chunk streaming based on player position
  public update(playerPosition: THREE.Vector3) {
    // 1. Determine which zone we are currently in
    let nearestZone = OPEN_WORLD_ZONES[0];
    let minDistance = Infinity;

    for (const zone of OPEN_WORLD_ZONES) {
      const dist = new THREE.Vector2(playerPosition.x, playerPosition.z).distanceTo(zone.center);
      if (dist < minDistance) {
        minDistance = dist;
        nearestZone = zone;
      }
    }

    // 2. Transition if we entered a new zone
    if (this.currentZoneId !== nearestZone.id) {
      this.transitionToZone(nearestZone);
    }

    // 3. Check for NPC interactions
    this.checkNPCInteractions(playerPosition);
  }

  private checkNPCInteractions(playerPos: THREE.Vector3) {
    const story = useStoryStore.getState();
    if (story.currentDialog) return; // Don't trigger if already in dialog

    this.npcs.forEach((data) => {
      const dist = playerPos.distanceTo(data.mesh.position);
      if (dist < this.interactionRadius) {
        // Automatically start dialog for now, or we could show a prompt
        StoryManager.getInstance().interactWithNPC(data.id);
      }
    });
  }

  private transitionToZone(zone: ZoneDefinition) {
    console.log(`[OpenWorld] Entering Zone: ${zone.name} (${zone.biome})`);
    this.currentZoneId = zone.id;

    // Smoothly transition environment parameters (Fog, Sky, Lights)
    // For now, we instantly snap to the biome's style
    const fogColor = new THREE.Color(zone.color).multiplyScalar(0.2); // Darken for mood
    
    // Background and Fog
    this.scene.background = fogColor;
    if (this.scene.fog) {
      this.scene.fog.color.copy(fogColor);
      (this.scene.fog as THREE.FogExp2).density = zone.biome === 'dungeon' ? 0.005 : 0.001;
    }

    // Lighting changes based on biome
    this.dirLight.color.setHex(zone.color);
    
    if (zone.biome === 'dungeon') {
      this.ambientLight.intensity = 0.2; // dark and scary
      this.dirLight.intensity = 0.5;
    } else if (zone.biome === 'street_racer') {
      this.ambientLight.intensity = 0.5;
      this.dirLight.intensity = 1.0;
    } else {
      this.ambientLight.intensity = 1.0;
      this.dirLight.intensity = 2.0;
    }

    // 3. Unload distant chunks and Load current/adjacent chunks
    this.loadZoneGeometryAsync(zone);
  }

  private async loadZoneGeometryAsync(zone: ZoneDefinition) {
    // Cleanup old zones (In a real game, keep adjacent zones in memory)
    this.zoneMeshes.forEach((group, id) => {
      if (id !== zone.id) {
        this.scene.remove(group);
      }
    });

    if (this.zoneMeshes.has(zone.id)) {
      this.scene.add(this.zoneMeshes.get(zone.id)!);
      return;
    }

    // --- PROCEDURAL PLACEHOLDER GENERATION FOR BIOMES ---
    // Once the Synty Assets are loaded, we will instantiate Prefabs here instead!
    const group = new THREE.Group();
    group.position.set(zone.center.x, 0, zone.center.y);

    // Giant ground plane for the zone
    const groundGeo = new THREE.PlaneGeometry(zone.radius * 2, zone.radius * 2, 64, 64);
    
    // Add noise to terrain
    const pos = groundGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const z = pos.getZ(i);
      let noise = (Math.random() - 0.5) * 5;
      if (zone.biome === 'scifi' || zone.biome === 'dungeon') noise *= 4; // rougher
      pos.setZ(i, z + noise);
    }
    groundGeo.computeVertexNormals();

    const groundMat = new THREE.MeshStandardMaterial({ 
      color: zone.color,
      roughness: 0.9,
      metalness: 0.1,
      wireframe: false
    });
    groundMat.color.multiplyScalar(0.3);

    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    group.add(ground);

    // --- TRY TO LOAD REAL SYNTY ASSETS VIA INSTANCING ---
    const assetMgr = AssetManager.getInstance();
    let propModelPath = '';
    
    // Guessing the exported GLB names based on typical Synty structures
    if (zone.biome === 'elven') propModelPath = '/assets/polygon/PolygonElvenRealm/SM_Env_Tree_01.glb';
    else if (zone.biome === 'dungeon') propModelPath = '/assets/polygon/PolygonDungeonRealms/SM_Prop_Pillar_01.glb';
    else if (zone.biome === 'street_racer') propModelPath = '/assets/polygon/PolygonApocalypseWasteland/SM_Bld_Bus_01.glb';
    else if (zone.biome === 'scifi') propModelPath = '/assets/polygon/PolygonSciFiWorlds/SM_Env_Crystal_01.glb';
    
    const numProps = 200;
    let propGlb: THREE.Group | null = null;
    
    if (propModelPath) {
      propGlb = await assetMgr.loadGLB(propModelPath);
    }

    if (propGlb) {
      // 🚀 SUCCESS: Create High-Performance InstancedMesh!
      const instancedMesh = assetMgr.createInstancedMesh(propGlb, numProps);
      if (instancedMesh) {
        const dummy = new THREE.Object3D();
        for (let i = 0; i < numProps; i++) {
          const angle = Math.random() * Math.PI * 2;
          const r = Math.random() * zone.radius * 0.9;
          dummy.position.set(Math.cos(angle) * r, 0, Math.sin(angle) * r);
          
          if (zone.biome === 'space' || zone.biome === 'dungeon') {
            dummy.position.y += Math.random() * 20; // floating
          }
          
          dummy.rotation.set(0, Math.random() * Math.PI * 2, 0);
          
          if (r < 100) dummy.scale.setScalar(5); // massive center landmark
          else dummy.scale.setScalar(Math.random() * 2 + 1);
          
          dummy.updateMatrix();
          instancedMesh.setMatrixAt(i, dummy.matrix);
        }
        instancedMesh.instanceMatrix.needsUpdate = true;
        group.add(instancedMesh);
        console.log(`[OpenWorld] Successfully loaded and instanced ${propModelPath}`);
      }
    } else {
      // 🛑 FALLBACK: Procedural shapes if GLB is not exported yet
      this.generateProceduralFallback(zone, group, numProps);
    }

    // ========================================================================
    // 🏙️ PROCEDURAL CITY GENERATION (Grid-based Metropolis)
    // ========================================================================
    this.occupiedBlocks.clear(); // Reset collisions for new zone
    if (zone.biome === 'street_racer' || zone.biome === 'scifi') {
      this.generateCity(zone, group, assetMgr);
    }

    this.scene.add(group);
    this.zoneMeshes.set(zone.id, group);

    // Spawn a few NPCs in the zone
    if (zone.biome === 'street_racer') {
      this.spawnNPC('lyra', new THREE.Vector3(zone.center.x + 20, 0, zone.center.y + 20), group);
    }
  }

  private async spawnNPC(id: string, position: THREE.Vector3, parent: THREE.Group) {
    const assetMgr = AssetManager.getInstance();
    // Use the preloaded enemy model as a base for NPCs for now
    const model = assetMgr.getEnemyModel();
    if (model) {
      model.position.copy(position);
      model.scale.setScalar(2.0); // NPCs are slightly bigger/distinct
      parent.add(model);
      
      // Add a quest marker
      const marker = this.createQuestMarker();
      marker.position.y = 5;
      model.add(marker);

      this.npcs.set(id, { mesh: model, id });
      console.log(`[OpenWorld] Spawned NPC ${id} at ${position.x}, ${position.z}`);
    }
  }

  private createQuestMarker(): THREE.Group {
    const marker = new THREE.Group();
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.8, 0.08, 8, 24),
      new THREE.MeshBasicMaterial({ color: 0xffd166 })
    );
    ring.rotation.x = Math.PI / 2;
    marker.add(ring);

    const beacon = new THREE.Mesh(
      new THREE.ConeGeometry(0.3, 1.0, 10),
      new THREE.MeshBasicMaterial({ color: 0xffef99 })
    );
    beacon.position.y = 0.9;
    marker.add(beacon);

    return marker;
  }

  // --- COLLISION DETECTION ---
  public checkCollision(position: THREE.Vector3, radius: number): boolean {
    if (this.occupiedBlocks.size === 0) return false;

    // Convert world position to grid coordinates
    const localX = position.x + this.cityOffset;
    const localZ = position.z + this.cityOffset;

    const gridX = Math.round(localX / this.cityBlockSize);
    const gridZ = Math.round(localZ / this.cityBlockSize);

    // If there's no building here, no collision
    if (!this.occupiedBlocks.has(`${gridX},${gridZ}`)) return false;

    // Check if we overlap the building's bounding box
    const centerX = (gridX * this.cityBlockSize) - this.cityOffset;
    const centerZ = (gridZ * this.cityBlockSize) - this.cityOffset;
    
    const halfSize = this.cityBuildingSize / 2;
    
    // AABB collision check with the circle/sphere of the object
    const closestX = THREE.MathUtils.clamp(position.x, centerX - halfSize, centerX + halfSize);
    const closestZ = THREE.MathUtils.clamp(position.z, centerZ - halfSize, centerZ + halfSize);
    
    const distanceX = position.x - closestX;
    const distanceZ = position.z - closestZ;
    
    return (distanceX * distanceX + distanceZ * distanceZ) < (radius * radius);
  }

  private async generateCity(zone: ZoneDefinition, parentGroup: THREE.Group, assetMgr: AssetManager) {
    console.log(`[CityGenerator] Building procedural metropolis for ${zone.name}...`);
    
    // Pool of diverse buildings for Wasteland biome
    const wastelandBldPool = [
      'SM_Bld_Building_01.glb',
      'SM_Bld_Building_03.glb',
      'SM_Bld_Building_05.glb',
      'SM_Bld_Building_07.glb',
      'SM_Bld_Garage_01.glb',
      'SM_Bld_Shack_05.glb',
      'SM_Bld_Tower_01.glb'
    ];

    const scifiBldPool = [
      'SM_Bld_Base_01.glb',
      'SM_Bld_Base_02.glb',
      'SM_Bld_Base_03.glb'
    ];

    const selectedPool = zone.biome === 'scifi' ? scifiBldPool : wastelandBldPool;
    const packFolder = zone.biome === 'scifi' ? 'PolygonSciFiWorlds' : 'PolygonApocalypseWasteland';
    
    // Load all models in the pool
    const modelGroups = await Promise.all(
      selectedPool.map(name => assetMgr.loadGLB(`/assets/polygon/${packFolder}/${name}`))
    );

    // Filter out failed loads
    const validModels = modelGroups.filter((g): g is THREE.Group => g !== null);
    if (validModels.length === 0) {
      console.error(`[CityGenerator] No valid models found in pool for ${zone.biome}`);
      return;
    }

    // Create an InstancedMesh for each model in the pool
    const instancedMeshes = validModels.map(model => assetMgr.createInstancedMesh(model, gridSize * gridSize));
    const validMeshes = instancedMeshes.filter((m): m is THREE.InstancedMesh => m !== null);

    // Pool of street props
    const wastelandPropPool = [
      'SM_Prop_Barrier_01.glb',
      'SM_Prop_Container_01.glb',
      'SM_Prop_Debris_01.glb',
      'SM_Prop_Tire_01.glb'
    ];
    
    const propModelGroups = await Promise.all(
      wastelandPropPool.map(name => assetMgr.loadGLB(`/assets/polygon/PolygonApocalypseWasteland/${name}`))
    );
    const validPropModels = propModelGroups.filter((g): g is THREE.Group => g !== null);
    const validPropMeshes = validPropModels.map(model => assetMgr.createInstancedMesh(model, gridSize * gridSize * 4)).filter((m): m is THREE.InstancedMesh => m !== null);

    const dummy = new THREE.Object3D();
    const propDummy = new THREE.Object3D();
    const meshIndices = new Array(validMeshes.length).fill(0);
    const propMeshIndices = new Array(validPropMeshes.length).fill(0);

    const offset = (gridSize * blockSize) / 2;
    this.cityBlockSize = blockSize;
    this.cityBuildingSize = blockSize - roadWidth;
    this.cityOffset = offset;

    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
        // Leave some empty lots for plazas or craters
        if (Math.random() > 0.8) continue;
        
        this.occupiedBlocks.add(`${x},${z}`);

        const posX = (x * blockSize) - offset;
        const posZ = (z * blockSize) - offset;
        
        // Pick a random model from the pool
        const meshIdx = Math.floor(Math.random() * validMeshes.length);
        const targetMesh = validMeshes[meshIdx];

        // Calculate distance from center to make skyscrapers in the middle
        const distToCenter = Math.sqrt(posX*posX + posZ*posZ);
        const heightMultiplier = Math.max(1, (offset - distToCenter) / 100);

        dummy.position.set(posX, 0, posZ);
        dummy.rotation.set(0, (Math.floor(Math.random() * 4) * Math.PI) / 2, 0); // Snap to 90 degrees
        
        // Sci-Fi cities go HIGH, Wasteland spreads WIDE
        if (zone.biome === 'scifi') {
          dummy.scale.set(Math.random() * 1 + 1.5, (Math.random() * 6 + 3) * heightMultiplier, Math.random() * 1 + 1.5);
        } else {
          dummy.scale.set(Math.random() * 1 + 1, Math.random() * 1.5 + 0.5, Math.random() * 1 + 1);
        }
        
        dummy.updateMatrix();
        targetMesh.setMatrixAt(meshIndices[meshIdx], dummy.matrix);
        meshIndices[meshIdx]++;

        // Street Props
        if (validPropMeshes.length > 0) {
          for (let p = 0; p < 4; p++) {
            if (Math.random() > 0.5) {
              const pIdx = Math.floor(Math.random() * validPropMeshes.length);
              const targetPropMesh = validPropMeshes[pIdx];
              
              const offsetX = (Math.random() - 0.5) * blockSize;
              const offsetZ = (Math.random() - 0.5) * blockSize;
              propDummy.position.set(posX + offsetX, 0, posZ + offsetZ);
              propDummy.rotation.set(0, Math.random() * Math.PI * 2, 0);
              propDummy.scale.setScalar(Math.random() * 1.5 + 0.5);
              
              propDummy.updateMatrix();
              targetPropMesh.setMatrixAt(propMeshIndices[pIdx], propDummy.matrix);
              propMeshIndices[pIdx]++;
            }
          }
        }
      }
    }

    // Finalize meshes and add to group
    validMeshes.forEach((mesh, idx) => {
      mesh.count = meshIndices[idx];
      mesh.instanceMatrix.needsUpdate = true;
      parentGroup.add(mesh);
    });

    validPropMeshes.forEach((mesh, idx) => {
      mesh.count = propMeshIndices[idx];
      mesh.instanceMatrix.needsUpdate = true;
      parentGroup.add(mesh);
    });
  }

  private generateProceduralFallback(zone: ZoneDefinition, group: THREE.Group, numProps: number) {
    console.log(`[OpenWorld] GLB not found, using procedural fallback for ${zone.biome}`);
    const propGeo = zone.biome === 'elven' ? new THREE.ConeGeometry(5, 40, 5) : 
                    zone.biome === 'dungeon' ? new THREE.OctahedronGeometry(10) :
                    new THREE.BoxGeometry(10, 20, 10);
                    
    const propMat = new THREE.MeshStandardMaterial({ color: zone.color });

    for (let i = 0; i < numProps; i++) {
      const mesh = new THREE.Mesh(propGeo, propMat);
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * zone.radius * 0.9;
      mesh.position.set(Math.cos(angle) * r, 10, Math.sin(angle) * r);
      
      if (zone.biome === 'dungeon' || zone.biome === 'space') {
        mesh.rotation.set(Math.random(), Math.random(), Math.random());
        mesh.position.y += Math.random() * 20;
      }
      
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      
      if (r < 100) mesh.scale.set(5, 10, 5);
      else mesh.scale.set(Math.random() * 2 + 0.5, Math.random() * 3 + 1, Math.random() * 2 + 0.5);
      
      group.add(mesh);
    }
  }
}
