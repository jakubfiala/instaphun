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
const Materials = require('Materials');
const Textures = require('Textures');
const Scene = require('Scene');
const Reactive = require('Reactive');
const Shaders = require('Shaders');
const Time = require('Time');

const cameraTexture = Textures.get('cameraTexture0');
const cameraSignal = cameraTexture.signal;
// Diagnostics.log(cameraSignal);

const material = Materials.get('wavey1');

const outputSignal = Reactive.expSmooth(cameraSignal, 300);
material.setTexture(outputSignal, { textureSlotName: 'diffuseTexture' });
