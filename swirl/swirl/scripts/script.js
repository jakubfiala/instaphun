//==============================================================================
// Welcome to scripting in Spark AR Studio! Helpful links:
//
// Scripting Basics - https://fb.me/spark-scripting-basics
// Reactive Programming - https://fb.me/spark-reactive-programming
// Scripting Object Reference - https://fb.me/spark-scripting-reference
// Changelogs - https://fb.me/spark-changelog
//==============================================================================
const Time = require('Time');
const Reactive = require('Reactive');
const Shaders = require('Shaders');
const Materials = require('Materials');
const Textures = require('Textures');

const RADIUS = 200;
const ANGLE = Shaders.fragmentStage(Reactive.sin(Time.ms.div(1000).div(100)).add(1).mul(720));

const material = Materials.get('material');
const cameraTexture = Textures.get('cameraTexture');
const cameraSignal = Shaders.fragmentStage(cameraTexture.signal);

// const position = Shaders.vertexAttribute({ variableName: Shaders.VertexAttribute.TEX_COORDS });
const position = Shaders.fragmentStage(Shaders.vertexAttribute({ variableName: Shaders.VertexAttribute.TEX_COORDS }));
const center = Reactive.pack2(0.5, 0.5);
const distance = position.distance(Reactive.pack2(0.5, 0.5));

let tc = position.sub(center);
const percent = Reactive.val(RADIUS).sub(distance).div(RADIUS);
const theta = percent.pow(2).mul(ANGLE);
const sine = Reactive.sin(theta);
const cosine = Reactive.cos(theta);

tc = Reactive.pack2(Reactive.dot(tc, Reactive.pack2(cosine, sine.mul(-1))), 
                    Reactive.dot(tc, Reactive.pack2(sine, cosine)));

tc = tc.add(center);

const output = Shaders.textureSampler(cameraSignal, tc);

material.setTexture(output, { textureSlotName: Shaders.PhysicallyBasedMaterialTextures.BASE_COLOR });
