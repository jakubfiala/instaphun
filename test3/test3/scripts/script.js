//==============================================================================
// Welcome to scripting in Spark AR Studio! Helpful links:
//
// Scripting Basics - https://fb.me/spark-scripting-basics
// Reactive Programming - https://fb.me/spark-reactive-programming
// Scripting Object Reference - https://fb.me/spark-scripting-reference
// Changelogs - https://fb.me/spark-changelog
//==============================================================================

// How to load in modules
const Diagnostics = require('Diagnostics');
const Scene = require('Scene');
const Time = require('Time');
const Reactive = require('Reactive');
const Shaders = require('Shaders');
const Materials = require('Materials');
const Textures = require('Textures');
const DeviceMotion = require('DeviceMotion');

const material = Materials.get('material0');
const cameraTexture = Textures.get('cameraTexture');

const position = Shaders.vertexAttribute({ variableName: Shaders.VertexAttribute.TEX_COORDS });

let curve = cameraTexture.signal;

for (let i = 0; i < 6; i++) {
    const wave = Reactive.sin(position.y.add(Time.ms.mul(0.002))).mul(0.3);
    const line = Shaders.sdfLine(Reactive.pack2(0.1, wave.add(0.1 + 0.15 * i)),
                                 Reactive.pack2(DeviceMotion.worldTransform.rotationZ,
                                                Reactive.val(1).sub(DeviceMotion.worldTransform.rotationZ)),
                                 0.001);
    curve = curve.mul(Reactive.step(line, Reactive.sin(Time.ms.mul(0.001)).add(1).mul(0.025).add(0.01))
                              .neg());
}

material.setTexture(curve, { textureSlotName: 'diffuseTexture' });
