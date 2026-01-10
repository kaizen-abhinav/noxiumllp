import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { Compass, Home, Phone, Users, Briefcase, Instagram } from 'lucide-react'
import { HoverBorderGradient } from './components/HoverBorderGradient'
import { AnimeNavBar, type NavItem } from './components/AnimeNavBar'
import { Tilt } from './components/Tilt'
import { FloatingShader } from './components/FloatingShader'

import { HandWrittenTitle } from './components/HandWrittenTitle'

import { Typewriter } from './components/Typewriter'
import emailjs from '@emailjs/browser'

type Founder = {
  nameLines: string[]
  role: string
  photo: string
  linkedin?: string
  instagram?: string
}

type TeamMember = {
  name: string
  title: string
  photo?: string
  linkedin?: string
  instagram?: string
}

const founders: Founder[] = [
  {
    nameLines: ['Abhinav Varghese', 'Abraham'],
    role: 'Chief Executive Officer',
    photo: '/pictures/abhinav.jpeg',
    linkedin: 'https://www.linkedin.com/in/abhinav-abraham-65a5ba224/',
    instagram: 'https://www.instagram.com/abhinav.abe/',
  },
  {
    nameLines: ['Albin Chacko'],
    role: 'Chief Operating Officer',
    photo: '/pictures/albin.jpeg',
    linkedin: 'https://www.linkedin.com/in/albin-chacko-7202b5327',
    instagram: 'https://www.instagram.com/albin.ck_/',
  },
  {
    nameLines: ['Reuben Skariah'],
    role: 'Chief Financial Officer',
    photo: '/pictures/reubenskaria.jpeg',
    linkedin: 'https://www.linkedin.com/in/reuben-skaria-792953326',
    instagram: 'https://www.instagram.com/reuben._703_/',
  },
]

const designTeam: TeamMember[] = [
  { name: 'Aman RT', title: 'Chief Design Officer', photo: '/pictures/aman.jpeg', linkedin: 'https://linkedin.com/in/aman-abdulla-200256327', instagram: 'https://www.instagram.com/_.a.m_n/' },
  { name: 'Abhirami M', title: 'Design Lead', photo: '/pictures/abhirami.jpeg', linkedin: 'https://www.linkedin.com/in/abhirami-manoj-8402b8327/', instagram: 'https://www.instagram.com/abiebiee/' },
  { name: 'Reuben Mathew', title: 'UX Designer', photo: '/pictures/reuben.jpeg', instagram: 'https://www.instagram.com/reuben7t/' },
  { name: 'Hari', title: 'Designer', photo: '/pictures/hari.jpeg', instagram: 'https://www.instagram.com/______.hari_/' },
  { name: 'Christy Roy', title: 'Designer', photo: '/pictures/christy.jpg', linkedin: 'https://www.linkedin.com/in/christy-roy-60989433b/', instagram: 'https://www.instagram.com/christy_o.o_/' },
]

const techTeam: TeamMember[] = [
  { name: 'Alvin VK', title: 'Chief Technology Officer', photo: '/pictures/Alvin.jpeg', linkedin: 'https://www.linkedin.com/in/alvin-vk/' },
  { name: 'Allen Thomas', title: 'Tech Lead', photo: '/pictures/allen.jpeg', linkedin: 'https://www.linkedin.com/in/allen-thomas-alex-843537330/', instagram: 'https://www.instagram.com/allen_thomas_alex' },
]

const teamSections = [
  { label: 'Design', number: '01', members: designTeam, reverse: false },
  { label: 'Technology', number: '02', members: techTeam, reverse: true },
]

const portfolioLogos = [
  'AGROTECH',
  'BIONICS+',
  'NEXUS SYSTEMS',
  'QUANTUM FIELD',
  'NEURAL LABS',
  'VERTEX ROBOTICS',
]

const supportedPrograms = [
  ['YIP (Young Innovators Programme)'],
  ['IEDC (Innovation and Entrepreneurship', 'Development Cell)'],
]

const conceptBlocks = [
  {
    number: '01.',
    title: 'What we do.',
    text:
      "We engineer next-generation robotic systems for industries ready to evolve. From precision agricultural drones to biomechanical prosthetics, we build intelligent machines that extend human capability and redefine what's possible.",
    alignment: 'left',
  },
  {
    number: '02.',
    title: 'How we do it.',
    text:
      'We are relentlessly selective in our partnerships. We prototype rapidly, fail intelligently, and iterate with precision. Our engineering-first mindset means we solve hard problems systematically - pushing through barriers until breakthrough becomes routine.',
    alignment: 'right',
  },
]

const navItems: NavItem[] = [
  { name: 'Home', url: '#top', icon: Home },
  { name: 'About', url: '#about', icon: Compass },
  { name: 'What We Do', url: '#what-we-do', icon: Briefcase },
  { name: 'Team', url: '#team', icon: Users },
  { name: 'Portfolio', url: '#portfolio', icon: Compass },
  { name: 'Contact', url: '#contact', icon: Phone },
]

const declarePI = `
#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846
`

const proceduralHash11 = `
float hash11(float p) {
    p = fract(p * 0.3183099) + 0.1;
    p *= p + 19.19;
    return fract(p * p);
}
`

const proceduralHash21 = `
float hash21(vec2 p) {
    p = fract(p * vec2(0.3183099, 0.3678794)) + 0.1;
    p += dot(p, p + 19.19);
    return fract(p.x * p.y);
}
`

const simplexNoise = `
vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
        -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
        + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
        dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}
`

const vertexShaderSource = `#version 300 es
precision mediump float;

layout(location = 0) in vec4 a_position;

void main() {
    gl_Position = a_position;
}
`

const fragmentShaderSource = `#version 300 es
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec4 u_colorBack;
uniform vec4 u_colorFront;
uniform float u_shape;
uniform float u_type;
uniform float u_pxSize;

out vec4 fragColor;

${simplexNoise}
${declarePI}
${proceduralHash11}
${proceduralHash21}

float getSimplexNoise(vec2 uv, float t) {
    float noise = .5 * snoise(uv - vec2(0., .3 * t));
    noise += .5 * snoise(2. * uv + vec2(0., .32 * t));
    return noise;
}

const int bayer2x2[4] = int[4](0, 2, 3, 1);
const int bayer4x4[16] = int[16](
    0,  8,  2, 10,
    12,  4, 14,  6,
    3, 11,  1,  9,
    15,  7, 13,  5
);

const int bayer8x8[64] = int[64](
    0, 32,  8, 40,  2, 34, 10, 42,
    48, 16, 56, 24, 50, 18, 58, 26,
    12, 44,  4, 36, 14, 46,  6, 38,
    60, 28, 52, 20, 62, 30, 54, 22,
    3, 35, 11, 43,  1, 33,  9, 41,
    51, 19, 59, 27, 49, 17, 57, 25,
    15, 47,  7, 39, 13, 45,  5, 37,
    63, 31, 55, 23, 61, 29, 53, 21
);

float getBayerValue(vec2 uv, int size) {
    ivec2 pos = ivec2(mod(uv, float(size)));
    int index = pos.y * size + pos.x;

    if (size == 2) {
        return float(bayer2x2[index]) / 4.0;
    } else if (size == 4) {
        return float(bayer4x4[index]) / 16.0;
    } else if (size == 8) {
        return float(bayer8x8[index]) / 64.0;
    }
    return 0.0;
}

void main() {
    float t = .5 * u_time;
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    uv -= .5;

    float pxSize = u_pxSize;
    vec2 pxSizeUv = gl_FragCoord.xy;
    pxSizeUv -= .5 * u_resolution;
    pxSizeUv /= pxSize;
    vec2 pixelizedUv = floor(pxSizeUv) * pxSize / u_resolution.xy;
    pixelizedUv += .5;
    pixelizedUv -= .5;

    vec2 shape_uv = pixelizedUv;
    vec2 dithering_uv = pxSizeUv;
    vec2 ditheringNoise_uv = uv * u_resolution;

    float shape = 0.;
    if (u_shape < 1.5) {
        shape_uv *= .001;
        shape = 0.5 + 0.5 * getSimplexNoise(shape_uv, t);
        shape = smoothstep(0.3, 0.9, shape);

    } else if (u_shape < 2.5) {
        shape_uv *= .003;
        for (float i = 1.0; i < 6.0; i++) {
            shape_uv.x += 0.6 / i * cos(i * 2.5 * shape_uv.y + t);
            shape_uv.y += 0.6 / i * cos(i * 1.5 * shape_uv.x + t);
        }
        shape = .15 / abs(sin(t - shape_uv.y - shape_uv.x));
        shape = smoothstep(0.02, 1., shape);

    } else if (u_shape < 3.5) {
        shape_uv *= .05;
        float stripeIdx = floor(2. * shape_uv.x / TWO_PI);
        float rand = hash11(stripeIdx * 10.);
        rand = sign(rand - .5) * pow(.1 + abs(rand), .4);
        shape = sin(shape_uv.x) * cos(shape_uv.y - 5. * rand * t);
        shape = pow(abs(shape), 6.);

    } else if (u_shape < 4.5) {
        shape_uv *= 4.;
        float wave = cos(.5 * shape_uv.x - 2. * t) * sin(1.5 * shape_uv.x + t) * (.75 + .25 * cos(3. * t));
        shape = 1. - smoothstep(-1., 1., shape_uv.y + wave);

    } else if (u_shape < 5.5) {
        float dist = length(shape_uv);
        float waves = sin(pow(dist, 1.7) * 7. - 3. * t) * .5 + .5;
        shape = waves;

    } else if (u_shape < 6.5) {
        float l = length(shape_uv);
        float angle = 6. * atan(shape_uv.y, shape_uv.x) + 4. * t;
        float twist = 1.2;
        float offset = pow(l, -twist) + angle / TWO_PI;
        float mid = smoothstep(0., 1., pow(l, twist));
        shape = mix(0., fract(offset), mid);

    } else {
        shape_uv *= 2.;
        float d = 1. - pow(length(shape_uv), 2.);
        vec3 pos = vec3(shape_uv, sqrt(d));
        vec3 lightPos = normalize(vec3(cos(1.5 * t), .8, sin(1.25 * t)));
        shape = .5 + .5 * dot(lightPos, pos);
        shape *= step(0., d);
    }

    int type = int(floor(u_type));
    float dithering = 0.0;

    switch (type) {
        case 1: {
            dithering = step(hash21(ditheringNoise_uv), shape);
        } break;
        case 2:
            dithering = getBayerValue(dithering_uv, 2);
            break;
        case 3:
            dithering = getBayerValue(dithering_uv, 4);
            break;
        default:
            dithering = getBayerValue(dithering_uv, 8);
            break;
    }

    dithering -= .5;
    float res = step(.5, shape + dithering);

    vec3 fgColor = u_colorFront.rgb * u_colorFront.a;
    float fgOpacity = u_colorFront.a;
    vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
    float bgOpacity = u_colorBack.a;

    vec3 color = fgColor * res;
    float opacity = fgOpacity * res;

    color += bgColor * (1. - opacity);
    opacity += bgOpacity * (1. - opacity);

    fragColor = vec4(color, opacity);
}
`

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const timeoutRef = useRef<number | null>(null)
  const [formVisible, setFormVisible] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionError, setSubmissionError] = useState<string | null>(null)

  const emailConfig = {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  }

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return
    }

    const elements = document.querySelectorAll('[data-observe="true"]')

    elements.forEach((element) => {
      const target = element as HTMLElementc
      target.style.opacity = '0'
      target.style.transform = 'translateY(30px)'
      target.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement
            target.style.opacity = '1'
            target.style.transform = 'translateY(0)'
            observer.unobserve(target)
          }
        })
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -50px 0px',
      },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const gl = canvas.getContext('webgl2')
    if (!gl) {
      console.error('WebGL2 not supported')
      return
    }

    let resizeTimeout: number | null = null
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    resizeCanvas()

    const handleResize = () => {
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout)
      }
      resizeTimeout = window.setTimeout(resizeCanvas, 100)
    }

    window.addEventListener('resize', handleResize)

    const createShader = (context: WebGL2RenderingContext, type: number, source: string) => {
      const shader = context.createShader(type)
      if (!shader) {
        return null
      }
      context.shaderSource(shader, source)
      context.compileShader(shader)
      if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
        console.error('Shader compile error:', context.getShaderInfoLog(shader))
        context.deleteShader(shader)
        return null
      }
      return shader
    }

    const createProgram = (
      context: WebGL2RenderingContext,
      vertexSource: string,
      fragmentSource: string,
    ) => {
      const vertexShader = createShader(context, context.VERTEX_SHADER, vertexSource)
      const fragmentShader = createShader(context, context.FRAGMENT_SHADER, fragmentSource)
      if (!vertexShader || !fragmentShader) {
        return null
      }

      const program = context.createProgram()
      if (!program) {
        return null
      }
      context.attachShader(program, vertexShader)
      context.attachShader(program, fragmentShader)
      context.linkProgram(program)

      if (!context.getProgramParameter(program, context.LINK_STATUS)) {
        console.error('Program link error:', context.getProgramInfoLog(program))
        context.deleteProgram(program)
        context.deleteShader(vertexShader)
        context.deleteShader(fragmentShader)
        return null
      }

      context.deleteShader(vertexShader)
      context.deleteShader(fragmentShader)
      return program
    }

    const program = createProgram(gl, vertexShaderSource, fragmentShaderSource)
    if (!program) {
      window.removeEventListener('resize', handleResize)
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout)
      }
      return
    }

    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')
    const positionBuffer = gl.createBuffer()

    if (positionAttributeLocation === -1 || !positionBuffer) {
      window.removeEventListener('resize', handleResize)
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout)
      }
      gl.deleteProgram(program)
      return
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1])
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)
    gl.enableVertexAttribArray(positionAttributeLocation)
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0)

    const uniformLocations = {
      u_time: gl.getUniformLocation(program, 'u_time'),
      u_resolution: gl.getUniformLocation(program, 'u_resolution'),
      u_colorBack: gl.getUniformLocation(program, 'u_colorBack'),
      u_colorFront: gl.getUniformLocation(program, 'u_colorFront'),
      u_shape: gl.getUniformLocation(program, 'u_shape'),
      u_type: gl.getUniformLocation(program, 'u_type'),
      u_pxSize: gl.getUniformLocation(program, 'u_pxSize'),
    }

    const config = {
      shape: 4,
      type: 4,
      colorBack: '#001122',
      colorFront: '#ff0088',
      pxSize: 4,
      speed: 0.6,
    }

    const hexToRgba = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      if (!result) {
        return new Float32Array([0, 0, 0, 1])
      }
      return new Float32Array([
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255,
        1,
      ])
    }

    let animationFrame = 0
    const startTime = performance.now()

    const render = () => {
      const time = ((performance.now() - startTime) * 0.001 * config.speed) % 1000

      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.useProgram(program)

      const rgbaBack = hexToRgba(config.colorBack)
      const rgbaFront = hexToRgba(config.colorFront)

      if (uniformLocations.u_time) {
        gl.uniform1f(uniformLocations.u_time, time)
      }
      if (uniformLocations.u_resolution) {
        gl.uniform2f(uniformLocations.u_resolution, canvas.width, canvas.height)
      }
      if (uniformLocations.u_colorBack) {
        gl.uniform4fv(uniformLocations.u_colorBack, rgbaBack)
      }
      if (uniformLocations.u_colorFront) {
        gl.uniform4fv(uniformLocations.u_colorFront, rgbaFront)
      }
      if (uniformLocations.u_shape) {
        gl.uniform1f(uniformLocations.u_shape, config.shape)
      }
      if (uniformLocations.u_type) {
        gl.uniform1f(uniformLocations.u_type, config.type)
      }
      if (uniformLocations.u_pxSize) {
        gl.uniform1f(uniformLocations.u_pxSize, config.pxSize)
      }

      gl.drawArrays(gl.TRIANGLES, 0, 6)
      animationFrame = requestAnimationFrame(render)
    }

    animationFrame = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout)
      }
      cancelAnimationFrame(animationFrame)
      if (positionBuffer) {
        gl.deleteBuffer(positionBuffer)
      }
      gl.deleteProgram(program)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formElement = event.currentTarget
    if (!emailConfig.serviceId || !emailConfig.templateId || !emailConfig.publicKey) {
      setSubmissionError('Contact form is not configured yet. Please try again later.')
      return
    }

    const formData = new FormData(formElement)
    const name = String(formData.get('name') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()

    if (!name || !email || !message) {
      setSubmissionError('Please fill out every field before sending your message.')
      return
    }

    setIsSubmitting(true)
    setSubmissionError(null)

    try {
      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        {
          from_name: name,
          reply_to: email,
          message,
        },
        emailConfig.publicKey,
      )

      formElement.reset()
      setFormVisible(false)

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = window.setTimeout(() => {
        setFormVisible(true)
      }, 5000)
    } catch (error) {
      console.error('EmailJS error:', error)
      setSubmissionError('We could not send your message. Please try again in a moment.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <span id="top" />
      <AnimeNavBar items={navItems} defaultActive="Home" />

      <main>
        <section className="hero">
          <canvas ref={canvasRef} className="hero-background" aria-hidden="true" />
          <div className="hero-content">
            <div className="hero-main">
              <h1 className="hero-title">
                Build at
                <br />
                the edge.
              </h1>
              <div className="hero-description">
                <p>
                  We are a robotics-driven innovation studio
                  <br />
                  pushing boundaries in agritech, prosthetics,
                  <br />
                  and autonomous systems.
                </p>
              </div>
            </div>
            <a href="#about" className="hero-explore">
              EXPLORE ↓
            </a>
          </div>
          <div className="hero-footer">NOXUSDYNAMICS ©2025</div>
        </section>

        <div className="post-hero">
          <FloatingShader />

          <section className="about" id="about">
            <div className="about-content">
              <h1 className="section-title-molgan">NoxusDynamics</h1>
              <p className="about-subtitle">Where our name comes from</p>
              <div className="about-text">
                <p>
                  Derived from "noxious" reimagined - a counterintuitive choice that reflects our
                  philosophy of challenging conventional wisdom and transforming perceived
                  limitations into breakthrough innovations.
                </p>
                <p>
                  We see our work as catalytic: disrupting stagnant approaches to robotics and
                  mechanical intelligence while preserving the essential principles of precision,
                  reliability, and human-centric design.
                </p>
              </div>
            </div>
          </section>

          <section className="concepts" id="what-we-do">
            {conceptBlocks.map((concept) => (
              <div
                key={concept.number}
                className={`concept-block concept-${concept.alignment}`}
                data-observe="true"
              >
                <div className="concept-number">{concept.number}</div>
                <h3 className="concept-title">{concept.title}</h3>
                <p className="concept-text">{concept.text}</p>
              </div>
            ))}
          </section>

          <section className="team" id="team">
            <div className="founders-section">
              <HandWrittenTitle title="Founders" />
              <div className="founders-grid">
                {founders.map((founder, index) => (
                  <div
                    key={founder.nameLines.join('-')}
                    className={`founder-card ${index === 0 ? 'founder-left' : index === 2 ? 'founder-right' : 'founder-center'}`}
                    data-observe="true"
                  >
                    <Tilt className="photo-tilt">
                      <div
                        className="founder-photo"
                        style={{
                          backgroundImage: `url(${founder.photo})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                    </Tilt>
                    <h3 className="founder-name">
                      {founder.nameLines.map((line, nameIndex) => (
                        <span key={`${line}-${nameIndex}`}>
                          {line}
                          {nameIndex < founder.nameLines.length - 1 && <br />}
                        </span>
                      ))}
                    </h3>
                    <p className="founder-role">{founder.role}</p>
                    <div className="founder-social">
                      {founder.linkedin && (
                        <a href={founder.linkedin} className="social-icon" target="_blank" rel="noopener noreferrer">
                          in
                        </a>
                      )}
                      {founder.instagram && (
                        <a href={founder.instagram} className="social-icon" target="_blank" rel="noopener noreferrer">
                          <Instagram size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="team-members-section">
              {teamSections.map((section) => (
                <div
                  className={`team-subsection ${section.reverse ? 'tech-team' : 'design-team'}`}
                  key={section.label}
                >
                  <div className="subsection-label">
                    <span className="subsection-number">{section.number}</span>
                    <h3 className="subsection-title">{section.label}</h3>
                  </div>
                  <div className="team-cards">
                    {section.members.map((member) => (
                      <div className="team-card" key={member.name} data-observe="true">
                        {member.photo ? (
                          <Tilt className="photo-tilt-small">
                            <div
                              className="team-photo-small"
                              style={{
                                backgroundImage: `url(${member.photo})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                              }}
                            />
                          </Tilt>
                        ) : (
                          <div className="team-photo-small" />
                        )}
                        <div className="team-info">
                          <h4 className="team-name-small">{member.name}</h4>
                          <p className="team-title-small">{member.title}</p>
                        </div>
                        {member.linkedin && (
                          <a href={member.linkedin} className="social-icon-small" target="_blank" rel="noopener noreferrer">
                            in
                          </a>
                        )}
                        {member.instagram && (
                          <a href={member.instagram} className="social-icon-small" target="_blank" rel="noopener noreferrer">
                            <Instagram size={14} />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="supported">
              <div className="supported-box">
                <h3 className="supported-title">Supported by:</h3>
                <div className="supported-text">
                  {supportedPrograms.map((program) => (
                    <p key={program.join('-')}>
                      {program.map((line, index) => (
                        <span key={`${line}-${index}`}>
                          {line}
                          {index < program.length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="portfolio" id="portfolio">
            <h2 className="section-title portfolio-title">
              <Typewriter
                text="Portfolio"
                className="typewriter-title"
                speed={85}
                deleteSpeed={40}
                cursor="▌"
              />
            </h2>
            <div className="portfolio-logos">
              {portfolioLogos.map((label) => (
                <div className="portfolio-logo" key={label} data-observe="true">
                  {label}
                </div>
              ))}
            </div>
          </section>

          <section className="contact" id="contact">
            <div className="contact-container">
              <div className="contact-left">
                <h2 className="contact-title">
                  Let's build
                  <br />
                  something
                  <br />
                  meaningful.
                </h2>
                <p className="contact-description">
                  Whether you're looking to collaborate on cutting-edge robotics or explore
                  partnership opportunities, we're ready to push boundaries together.
                </p>
              </div>
              <div className="contact-right">
                <form
                  className="contact-form"
                  id="contactForm"
                  onSubmit={handleContactSubmit}
                  style={{ display: formVisible ? 'flex' : 'none' }}
                >
                  <input type="text" name="name" placeholder="Name" required className="form-input" />
                  <input type="email" name="email" placeholder="Email" required className="form-input" />
                  <textarea name="message" placeholder="Message" required className="form-textarea" />
                  {submissionError && (
                    <p className="form-error" role="alert">
                      {submissionError}
                    </p>
                  )}
                  <HoverBorderGradient type="submit" disabled={isSubmitting} aria-disabled={isSubmitting}>
                    {isSubmitting ? 'Sending…' : 'Send Message'}
                  </HoverBorderGradient>
                </form>
                <div className={`form-confirmation ${formVisible ? '' : 'show'}`} id="formConfirmation">
                  <p aria-live="polite">Thank you for reaching out. We'll be in touch soon.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Analytics />
    </>
  )
}

export default App
