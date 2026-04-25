import bpy
import os
import glob
import sys

BASE_POLYGON_DIR = r"C:\Users\zirku\Downloads\PolygonApocalypseWasteland"
OUTPUT_BASE_DIR = r"C:\Users\zirku\Downloads\htown-combat-web-main\htown-combat-web-main\public\assets\polygon"

def clear_scene():
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)
    for block in bpy.data.meshes:
        if block.users == 0: bpy.data.meshes.remove(block)
    for block in bpy.data.materials:
        if block.users == 0: bpy.data.materials.remove(block)
    for block in bpy.data.images:
        if block.users == 0: bpy.data.images.remove(block)

def find_main_texture(pack_dir):
    textures_dir = os.path.join(pack_dir, "Textures")
    if not os.path.exists(textures_dir):
        # Fallback to search recursively for png
        for root, _, files in os.walk(pack_dir):
            for f in files:
                if f.endswith('.png') and ('_A' in f or 'BaseColor' in f or 'Texture' in f):
                    return os.path.join(root, f)
        return None

    pngs = glob.glob(os.path.join(textures_dir, "*.png"))
    for p in pngs:
        if "_A.png" in p or "BaseColor" in p or "Texture_01" in p:
            return p
    return pngs[0] if pngs else None

def process_pack(pack_name):
    pack_dir = os.path.join(BASE_POLYGON_DIR, pack_name)
    out_dir = os.path.join(OUTPUT_BASE_DIR, pack_name)
    
    if not os.path.exists(out_dir):
        os.makedirs(out_dir)

    texture_path = find_main_texture(pack_dir)
    print(f"[{pack_name}] Using texture: {texture_path}")

    # Gather FBX files
    fbx_files = []
    for root, _, files in os.walk(pack_dir):
        for f in files:
            if f.lower().endswith(".fbx"):
                fbx_files.append(os.path.join(root, f))
                
    print(f"[{pack_name}] Found {len(fbx_files)} FBX files. Starting conversion...")

    count = 0
    # Process files
    for fbx_file in fbx_files:
        filename = os.path.basename(fbx_file)
        name_only = os.path.splitext(filename)[0]
        out_path = os.path.join(out_dir, f"{name_only}.glb")
        
        if os.path.exists(out_path):
            continue # Skip if already exported

        clear_scene()
        
        try:
            bpy.ops.import_scene.fbx(filepath=fbx_file)
        except Exception as e:
            print(f"Fehler beim Import von {fbx_file}: {e}")
            continue

        # Create and assign material
        mat = bpy.data.materials.new(name="SyntyMaterial")
        mat.use_nodes = True
        bsdf = mat.node_tree.nodes.get("Principled BSDF")
        if texture_path and os.path.exists(texture_path):
            try:
                texImage = mat.node_tree.nodes.new('ShaderNodeTexImage')
                texImage.image = bpy.data.images.load(texture_path)
                mat.node_tree.links.new(bsdf.inputs['Base Color'], texImage.outputs['Color'])
                bsdf.inputs['Roughness'].default_value = 0.8
                bsdf.inputs['Specular IOR Level'].default_value = 0.1 # Blender 4.0+ uses Specular IOR Level usually
            except Exception as e:
                print(f"Fehler bei Textur {texture_path}: {e}")

        for obj in bpy.context.scene.objects:
            if obj.type == 'MESH':
                if len(obj.data.materials) > 0:
                    obj.data.materials[0] = mat
                else:
                    obj.data.materials.append(mat)
                    
        try:
            bpy.ops.export_scene.gltf(
                filepath=out_path,
                export_format='GLB',
                export_apply=True,
                export_yup=True,
                export_animations=True
            )
            count += 1
            if count % 50 == 0:
                print(f"[{pack_name}] {count}/{len(fbx_files)} exportiert...")
        except Exception as e:
            print(f"Fehler beim Export von {filename}: {e}")

    print(f"[{pack_name}] Fertig! {count} Modelle exportiert.")

if __name__ == "__main__":
    packs = [d for d in os.listdir(BASE_POLYGON_DIR) if os.path.isdir(os.path.join(BASE_POLYGON_DIR, d))]
    for pack in packs:
        try:
            process_pack(pack)
        except Exception as e:
            print(f"CRITICAL ERROR in pack {pack}: {e}")
    print("ALL PACKS COMPLETED!")
