"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const MeshBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Geometry
    const geometry = new THREE.PlaneGeometry(25, 15, 64, 64);

    // Mouse position state
    const mouse = { x: 0, y: 0 };
    const targetMouse = { x: 0, y: 0 };

    // Custom Shader Material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uColorPrimary: { value: new THREE.Color("#FDB360") }, // Primary-500
        uColorSecondary: { value: new THREE.Color("#e39c4a") }, // Primary-600
        uColorTertiary: { value: new THREE.Color("#fef3c7") }, // Amber-100 (Very soft)
        uColorQuaternary: { value: new THREE.Color("#dbeafe") }, // Blue-100 (Subtle)
      },
      vertexShader: `
        varying vec2 vUv;
        varying float vElevation;
        uniform float uTime;
        uniform vec2 uMouse;

        // Simple noise function
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                              0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                             -0.577350269189626,  // -1.0 + 2.0 * C.x
                              0.024390243902439); // 1.0 / 41.0
          vec2 i  = floor(v + dot(v, C.yy) );
          vec2 x0 = v -   i + dot(i, C.xx);
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod289(i);
          vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                + i.x + vec3(0.0, i1.x, 1.0 ));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
          m = m*m ;
          m = m*m ;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        void main() {
          vUv = uv;
          
          float slowTime = uTime * 0.15;
          float elevation = snoise(uv * 1.5 + slowTime) * 0.6;
          elevation += snoise(uv * 2.5 - slowTime * 1.2) * 0.3;

          // Mouse influence - finding the middle ground
          float dist = distance(uv, uMouse);
          float influence = smoothstep(0.3, 0.0, dist); // Increased from 0.2
          elevation += influence * 1.5; // Increased from 1.0
          
          vElevation = elevation;

          vec3 pos = position;
          pos.z += elevation;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying float vElevation;
        uniform vec3 uColorPrimary;
        uniform vec3 uColorSecondary;
        uniform vec3 uColorTertiary;
        uniform vec3 uColorQuaternary;
        uniform float uTime;
        uniform vec2 uMouse;

        float random(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }

        void main() {
          vec3 color = mix(uColorPrimary, uColorSecondary, vUv.x);
          color = mix(color, uColorQuaternary, vUv.y);
          color = mix(color, uColorTertiary, vElevation * 0.5 + 0.5);

          // Mouse proximity highlights - deeper brand primary color glow
          float mouseDist = distance(vUv, uMouse);
          float glow = smoothstep(0.25, 0.0, mouseDist);
          vec3 primaryGlow = vec3(0.89, 0.55, 0.15); // Deeper, more saturated orange
          color = mix(color, primaryGlow, glow * 1.0); // Full intensity at center

          // Add grain/noise
          float grain = random(vUv * uTime) * 0.08;
          color += grain;

          gl_FragColor = vec4(color, 0.5); // Increased background opacity slightly from 0.4
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Animation
    let animationFrameId: number;
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      material.uniforms.uTime.value = elapsedTime;

      // Smoothen mouse movement (lerping) - increased speed for more responsiveness
      mouse.x += (targetMouse.x - mouse.x) * 0.1;
      mouse.y += (targetMouse.y - mouse.y) * 0.1;
      material.uniforms.uMouse.value.set(mouse.x, mouse.y);
      
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize to 0-1 range for UV coordinates
      targetMouse.x = event.clientX / window.innerWidth;
      targetMouse.y = 1.0 - (event.clientY / window.innerHeight);
    };

    // Resize handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      container.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10 pointer-events-none opacity-40 overflow-hidden" 
    />
  );
};

export default MeshBackground;
