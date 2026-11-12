export type ProtocolId =
  | "uart"
  | "spi"
  | "i2c"
  | "i2s"
  | "can"
  | "lora"
  | "bluetooth"
  | "nfc";

export interface HeroEditorialData {
  punchline: string;
  punchlineHighlight: string;
  bioBrief: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  asciiArtAlt: string;
}

export interface ProfileData {
  fullName: string;
  monogram: string;
  academicStatus: string;
  university: string;
  location: string;
  headlineTags: string[];
  statusBanner: string;
  systemId: string;
  email: string;
  phone: string;
  phoneHref: string;
  linkedinUrl: string;
  linkedinLabel: string;
  githubUrl: string;
  githubLabel: string;
  resumePdfUrl: string;
  bio: string;
  quickMetrics: {
    label: string;
    value: string;
    subtext: string;
  }[];
  corePillars: {
    id: string;
    title: string;
    description: string;
  }[];
}

export interface ProtocolItem {
  id: ProtocolId;
  name: string;
  busType: string;
  hardwareContext: string;
  relatedProjectIds: string[];
}

export interface SkillItem {
  name: string;
  levelOrContext: string;
  tier:
    | "Tier 1 · Primary Focus"
    | "Tier 2 · Applied"
    | "Tier 3 · Foundational"
    | "Tier 3 · Project Exposure"
    | "Core Hardware";
  isPrimaryHighlight?: boolean;
  isDeemphasized?: boolean;
}

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  items: SkillItem[];
}

export interface ProjectItem {
  id: string;
  title: string;
  dates: string;
  isOngoing: boolean;
  primaryFocus: string;
  signalChain: string[];
  protocolIds: ProtocolId[];
  bullets: string[];
  techTags: string[];
  githubUrl?: string;
  schematicPdfUrl?: string;
  pcbImageUrl?: string;
  demoVideoUrl?: string;
}

export interface ExperienceItem {
  id: string;
  companyOrOrg: string;
  role: string;
  dates: string;
  locationOrMode: string;
  type: "internship" | "organization";
  bullets: string[];
  techTags: string[];
}

export interface EducationData {
  institution: string;
  location: string;
  degree: string;
  duration: string;
  expectedGraduation: string;
  cgpa: string;
  coursework: string[];
  certifications: {
    title: string;
    issuer: string;
    focus: string;
    certificateUrl?: string;
  }[];
}

export const PROFILE_DATA: ProfileData = {
  fullName: "Aravind V S",
  monogram: "AV",
  academicStatus: "Electronics & Communication Engineering Undergraduate",
  university: "VIT-AP University",
  location: "Amaravati, Andhra Pradesh, India",
  headlineTags: [
    "Embedded Systems Engineer",
    "Embedded Hardware",
    "Firmware Development",
    "PCB Design",
    "Wireless Communication",
  ],
  statusBanner: "B.Tech ECE (2023 – May 2027) · Embedded Hardware & Firmware",
  systemId: "SYS_ID: AVS-ECE-2027 // REV 1.0",
  email: "aravindvs2005@gmail.com",
  phone: "+91 8848441097",
  phoneHref: "tel:+918848441097",
  linkedinUrl: "https://www.linkedin.com/in/aravind-vs-43619a339",
  linkedinLabel: "linkedin.com/in/aravind-vs-43619a339",
  githubUrl: "https://github.com/aravindd3",
  githubLabel: "github.com/aravindd3",
  resumePdfUrl: "/docs/Aravind_VS_Resume.pdf",
  bio: "Electronics and Communication Engineering undergraduate at VIT-AP University focused on embedded systems, hardware design, PCB layout, and firmware development. Experienced in building practical electronic systems that integrate microcontrollers, custom KiCad PCBs, sensors, and wireless communication interfaces (LoRa, Bluetooth, UART, SPI, I²C, I²S, CAN). Dedicated to embedded hardware engineering, circuit prototyping, and low-level firmware validation.",
  quickMetrics: [
    {
      label: "Cumulative GPA",
      value: "8.49 / 10",
      subtext: "VIT-AP University · ECE",
    },
    {
      label: "Custom PCB & ERC",
      value: "KiCad 10.0",
      subtext: "Schematic Capture & Layout",
    },
    {
      label: "Wired & RF Protocols",
      value: "8 Buses",
      subtext: "UART · SPI · I²C · I²S · CAN · LoRa · BLE · NFC",
    },
    {
      label: "Primary Firmware",
      value: "C / Emb. C",
      subtext: "Bare-Metal & Peripheral Drivers",
    },
  ],
  corePillars: [
    {
      id: "01",
      title: "Microcontroller-Based System Development",
      description:
        "End-to-end architecture using STM32F407, ESP32-WROOM-32, Arduino Uno R3, and Raspberry Pi 3 B+.",
    },
    {
      id: "02",
      title: "PCB Schematic Capture & Layout",
      description:
        "Custom board design, component placement, trace routing, and Electrical Rules Check (ERC) validation in KiCad 10.0.",
    },
    {
      id: "03",
      title: "Wireless & Wired Communication",
      description:
        "Practical hardware interfacing across LoRa, Bluetooth, NFC/RFID, UART, SPI, I²C, I²S, and CAN protocols.",
    },
    {
      id: "04",
      title: "Sensor Interfacing & Hardware-Software Integration",
      description:
        "Bridging analog/digital transducers, MEMS audio peripherals, and displays with deterministic control logic.",
    },
    {
      id: "05",
      title: "Embedded Firmware Development & Debugging",
      description:
        "Writing modular C/Embedded C firmware and validating signals with oscilloscopes, logic analyzers, and digital multimeters.",
    },
    {
      id: "06",
      title: "Biomedical Signal Acquisition",
      description:
        "Developing custom ECG signal acquisition and monitoring hardware aimed at atrial fibrillation detection.",
    },
  ],
};

export const HERO_EDITORIAL_DATA: HeroEditorialData = {
  punchline: "Engineering at the intersection of",
  punchlineHighlight: "bare-metal firmware & physical circuitry.",
  bioBrief:
    "Focused on bridging hardware-level architectures with deterministic firmware to build robust, interconnected devices.",
  primaryCtaLabel: "Explore Projects",
  primaryCtaHref: "#projects",
  asciiArtAlt:
    "ASCII art illustration of a metallic robotic hand on the left and a human hand on the right reaching toward a glowing embedded hardware core.",
};

export const PROTOCOLS: ProtocolItem[] = [
  {
    id: "uart",
    name: "UART",
    busType: "Async Serial",
    hardwareContext:
      "GPS NMEA data acquisition, GSM AT commands, serial debugging",
    relatedProjectIds: ["PRJ-04", "PRJ-02"],
  },
  {
    id: "spi",
    name: "SPI",
    busType: "Sync Serial",
    hardwareContext:
      "SX1278 LoRa RF transceiver & high-speed peripheral interfacing",
    relatedProjectIds: ["PRJ-02", "PRJ-03"],
  },
  {
    id: "i2c",
    name: "I²C",
    busType: "2-Wire Bus",
    hardwareContext:
      "OLED telemetry displays, I²C character LCDs, multi-sensor buses",
    relatedProjectIds: ["PRJ-02", "PRJ-04"],
  },
  {
    id: "i2s",
    name: "I²S",
    busType: "Digital Audio",
    hardwareContext:
      "INMP441 digital MEMS microphone & MAX98357A Class-D audio streaming",
    relatedProjectIds: ["PRJ-02"],
  },
  {
    id: "can",
    name: "CAN",
    busType: "Differential Bus",
    hardwareContext:
      "Differential serial bus protocol for automotive & industrial nodes",
    relatedProjectIds: ["PRJ-01"],
  },
  {
    id: "lora",
    name: "LoRa",
    busType: "Sub-GHz RF",
    hardwareContext:
      "Peer-to-peer packetized voice transmission via SX1278 transceiver",
    relatedProjectIds: ["PRJ-02"],
  },
  {
    id: "bluetooth",
    name: "Bluetooth",
    busType: "Short-Range RF",
    hardwareContext:
      "Wireless telemetry, mobile interfacing, and smart suitcase control",
    relatedProjectIds: ["PRJ-03"],
  },
  {
    id: "nfc",
    name: "NFC / RFID",
    busType: "13.56 MHz ID",
    hardwareContext:
      "Secure owner authentication, proximity access, and tag verification",
    relatedProjectIds: ["PRJ-03"],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "languages-databases",
    title: "Programming Languages & Databases",
    subtitle: "Primary Bare-Metal Firmware & Companion Tooling",
    items: [
      {
        name: "C / Embedded C",
        levelOrContext: "Intermediate · Primary Firmware & Bare-Metal Language",
        tier: "Tier 1 · Primary Focus",
        isPrimaryHighlight: true,
      },
      {
        name: "Java",
        levelOrContext: "Academic & Object-Oriented Programming Experience",
        tier: "Tier 2 · Applied",
      },
      {
        name: "Kotlin",
        levelOrContext:
          "Android Application Development (Hardware Companion Apps)",
        tier: "Tier 2 · Applied",
      },
      {
        name: "SQL / MySQL",
        levelOrContext: "Basic Relational Database Queries",
        tier: "Tier 3 · Foundational",
      },
      {
        name: "Python",
        levelOrContext:
          "Project Exposure (Testing / Scripting; not a primary focus)",
        tier: "Tier 3 · Project Exposure",
        isDeemphasized: true,
      },
    ],
  },
  {
    id: "embedded-platforms",
    title: "Embedded Systems & Hardware Platforms",
    subtitle: "Microcontroller Architectures & Validation Boards",
    items: [
      {
        name: "STM32F407 Discovery Board",
        levelOrContext: "ARM Cortex-M4 · Peripheral Registers & HAL Drivers",
        tier: "Core Hardware",
      },
      {
        name: "ESP32-WROOM-32",
        levelOrContext: "Dual-Core MCU with Wi-Fi/BLE · Sub-GHz RF & Audio",
        tier: "Core Hardware",
      },
      {
        name: "Arduino Uno R3",
        levelOrContext: "ATmega328P · Sensor Control, GPS/GSM & Motor Loops",
        tier: "Core Hardware",
      },
      {
        name: "Raspberry Pi 3 B+",
        levelOrContext:
          "System-Level Testing, Bio-Signal Acquisition & Validation SBC",
        tier: "Core Hardware",
      },
    ],
  },
  {
    id: "hardware-competencies",
    title: "Hardware Engineering Competencies",
    subtitle: "Board-Level Bring-Up & Deterministic System Integration",
    items: [
      {
        name: "Microcontroller Interfacing & GPIO Configuration",
        levelOrContext: "Pin multiplexing, interrupt lines & timing control",
        tier: "Core Hardware",
      },
      {
        name: "Sensor Interfacing & Signal Conditioning",
        levelOrContext:
          "Analog/digital transducers, MEMS audio peripherals & ECG front-ends",
        tier: "Core Hardware",
      },
      {
        name: "Deterministic Embedded Firmware Development",
        levelOrContext:
          "Modular C drivers, packetized buffering & state control",
        tier: "Core Hardware",
      },
      {
        name: "Hardware-Software Co-Design & Integration",
        levelOrContext:
          "Bridging custom schematics, RF transceivers & embedded displays",
        tier: "Core Hardware",
      },
      {
        name: "Electronic Circuit Prototyping & Troubleshooting",
        levelOrContext:
          "Bench prototyping, board-level continuity & fault isolation",
        tier: "Core Hardware",
      },
    ],
  },
  {
    id: "pcb-design-eda",
    title: "PCB Design & EDA",
    subtitle: "Primary Tool: KiCad 10.0",
    items: [
      {
        name: "KiCad 10.0",
        levelOrContext:
          "Primary Schematic Capture, Layout & ERC Validation Suite",
        tier: "Tier 1 · Primary Focus",
        isPrimaryHighlight: true,
      },
      {
        name: "Schematic Capture & Custom Component Symbols",
        levelOrContext: "Multi-net circuit design & library symbol creation",
        tier: "Core Hardware",
      },
      {
        name: "PCB Layout, Component Placement & Trace Routing",
        levelOrContext: "Clean signal paths & mechanical board constraints",
        tier: "Core Hardware",
      },
      {
        name: "Footprint Assignment & Physical Connector Interfacing",
        levelOrContext: "Board-to-board headers & sensor port mapping",
        tier: "Core Hardware",
      },
      {
        name: "Electrical Rules Check (ERC) & Design Validation",
        levelOrContext: "Pre-fabrication netlist integrity & pin-rule checks",
        tier: "Core Hardware",
      },
      {
        name: "Hardware Prototyping & Post-Fabrication Debugging",
        levelOrContext: "Board bring-up & hardware-level verification",
        tier: "Core Hardware",
      },
    ],
  },
  {
    id: "lab-equipment",
    title: "Hardware Testing & Lab Bench Equipment",
    subtitle: "Physical Signal Integrity & Bus Timing Verification",
    items: [
      {
        name: "Oscilloscope",
        levelOrContext:
          "Waveform verification, analog signal integrity, and timing analysis",
        tier: "Core Hardware",
      },
      {
        name: "Logic Analyzer",
        levelOrContext:
          "Protocol decoding and bus timing verification for UART, SPI, I²C, and I²S",
        tier: "Core Hardware",
      },
      {
        name: "Digital Multimeter",
        levelOrContext:
          "Continuity testing, power rail verification, and impedance checks",
        tier: "Core Hardware",
      },
    ],
  },
  {
    id: "software-dev-tools",
    title: "Software & Development Tools",
    subtitle: "Embedded IDEs, Version Control & Engineering Suites",
    items: [
      {
        name: "STM32CubeIDE & Arduino IDE",
        levelOrContext: "Embedded C firmware compilation, flashing & debugging",
        tier: "Tier 2 · Applied",
      },
      {
        name: "KiCad 10.0",
        levelOrContext: "Schematic capture, PCB routing & ERC verification",
        tier: "Tier 1 · Primary Focus",
      },
      {
        name: "Visual Studio Code, Git & GitHub",
        levelOrContext: "Code authoring & version-controlled engineering work",
        tier: "Tier 2 · Applied",
      },
      {
        name: "MATLAB",
        levelOrContext: "Signal analysis & control system modeling",
        tier: "Tier 2 · Applied",
      },
      {
        name: "Android Studio",
        levelOrContext: "Kotlin mobile companion application development",
        tier: "Tier 2 · Applied",
      },
      {
        name: "Jupyter Notebook",
        levelOrContext: "Supporting test & scripting environment",
        tier: "Tier 3 · Project Exposure",
        isDeemphasized: true,
      },
    ],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "PRJ-01",
    title: "ECG Monitoring System for Atrial Fibrillation Detection",
    dates: "07/2026 – Present",
    isOngoing: true,
    primaryFocus: "Custom PCB Hardware Design · Biomedical Signal Acquisition",
    signalChain: [
      "ECG Electrodes & Analog Front-End",
      "Custom KiCad 10.0 PCB (ERC Validated)",
      "Raspberry Pi 3 B+ Interface",
      "Signal Processing & Hardware Validation",
    ],
    protocolIds: ["can"],
    bullets: [
      "Developing an embedded ECG monitoring prototype aimed at atrial fibrillation detection, with primary engineering responsibility on custom hardware design and clean bio-signal acquisition.",
      "Designed a custom PCB in KiCad 10.0, executing full schematic capture, precision component placement, trace routing, physical connector interfacing, and Electrical Rules Check (ERC) validation.",
      "Integrating the custom ECG acquisition board with a Raspberry Pi 3 B+ for system-level hardware testing, signal processing, and end-to-end prototype validation.",
    ],
    techTags: [
      "KiCad 10.0",
      "Custom PCB Design",
      "ERC Validation",
      "ECG Signal Acquisition",
      "Raspberry Pi 3 B+",
      "Hardware Validation",
    ],
  },
  {
    id: "PRJ-02",
    title: "LoRa-Based Voice Communication System",
    dates: "12/2025 – 03/2026",
    isOngoing: false,
    primaryFocus:
      "Low-Power Sub-GHz RF · Digital Audio & Embedded Firmware",
    signalChain: [
      "INMP441 I²S MEMS Mic",
      "ESP32-WROOM-32 (Audio Compression & PTT)",
      "SX1278 LoRa RF Transceiver (SPI)",
      "MAX98357A I²S Class-D Amp + OLED (I²C)",
    ],
    protocolIds: ["lora", "i2s", "spi", "i2c", "uart"],
    bullets: [
      "Engineered two peer-to-peer ESP32-WROOM-32 LoRa voice communication handsets enabling long-range, low-power wireless voice transmission without cellular or Wi-Fi infrastructure.",
      "Interfaced an SX1278 LoRa RF transceiver over SPI, an INMP441 I²S digital MEMS microphone, a MAX98357A I²S Class-D audio amplifier, and an OLED display for voice capture, packetized RF transmission, amplified audio playback, and live system telemetry.",
      "Developed custom embedded firmware implementing real-time audio compression, packetized buffering, and push-to-talk (PTT) state control tailored to sub-GHz LoRa bandwidth constraints.",
    ],
    techTags: [
      "ESP32-WROOM-32",
      "SX1278 LoRa",
      "INMP441 (I²S)",
      "MAX98357A (I²S)",
      "OLED (I²C/SPI)",
      "Embedded Firmware",
      "Audio Compression",
    ],
  },
  {
    id: "PRJ-03",
    title: "Self-Navigating Smart Suitcase",
    dates: "09/2024 – 12/2024",
    isOngoing: false,
    primaryFocus:
      "Autonomous Robotics · Sensor Fusion & Wireless Access Control",
    signalChain: [
      "Ultrasonic/IR Sensors + RFID Reader",
      "Arduino Uno R3 Control Firmware",
      "Bluetooth Wireless Telemetry",
      "Closed-Loop Motor Drive Actuation",
    ],
    protocolIds: ["bluetooth", "nfc", "spi"],
    bullets: [
      "Built an Arduino-based self-navigating smart suitcase featuring autonomous owner-following control and real-time obstacle avoidance.",
      "Integrated short-range wireless communication modules and RFID/NFC-based user authentication for secure owner identification and real-time proximity tracking.",
      "Authored low-latency Embedded C firmware for wireless packet handling, multi-sensor polling, and closed-loop motor drive actuation.",
    ],
    techTags: [
      "Arduino Uno R3",
      "Embedded C",
      "RFID / NFC Auth",
      "Bluetooth Telemetry",
      "Sensor Interfacing",
      "Autonomous Motor Control",
    ],
  },
  {
    id: "PRJ-04",
    title:
      "Arduino-Based Women's Safety Alert System (Maven Silicon Internship Build)",
    dates: "05/2025 – 07/2025",
    isOngoing: false,
    primaryFocus:
      "Embedded C Firmware · GPS/GSM Telemetry & Alert Hardware",
    signalChain: [
      "Emergency Push-Button + GPS Receiver (UART)",
      "Arduino Uno R3 (Embedded C)",
      "GSM Cellular Module (AT/SMS)",
      "I²C LCD Status Readout + Buzzer",
    ],
    protocolIds: ["uart", "i2c"],
    bullets: [
      "Designed and prototyped a dedicated hardware safety alert system during the Maven Silicon Embedded System Design Internship using an Arduino Uno R3 and Embedded C.",
      "Interfaced a UART GPS receiver for real-time NMEA coordinate extraction and a GSM cellular module for automated emergency SMS dispatch and two-way remote SMS command handling.",
      "Integrated an I²C character LCD and audible buzzer for immediate local status feedback and field diagnostics.",
    ],
    techTags: [
      "Embedded C",
      "Arduino Uno R3",
      "UART GPS",
      "GSM AT Commands",
      "I²C LCD",
      "Hardware Prototyping",
    ],
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "EXP-01",
    companyOrOrg: "Maven Silicon",
    role: "Embedded System Design Intern",
    dates: "05/2025 – 07/2025",
    locationOrMode: "Remote",
    type: "internship",
    bullets: [
      "Completed a structured project-based engineering internship focused on embedded system architecture, microcontroller peripherals, and modular Embedded C firmware development.",
      "Designed and built an Arduino Uno-based Women's Safety Alert System integrating a GPS receiver module, GSM cellular module, I²C LCD display, audible emergency buzzer, and tactile push-button trigger interfaces.",
      "Authored deterministic Embedded C drivers and UART/I²C serial communication routines for real-time GPS coordinate acquisition, automated GSM SMS distress alerts, live LCD status readouts, and two-way SMS remote alert control.",
    ],
    techTags: [
      "Embedded C",
      "Arduino Uno R3",
      "UART",
      "I²C LCD",
      "GPS Module",
      "GSM SMS Control",
    ],
  },
  {
    id: "EXP-02",
    companyOrOrg: "IETE Student's Forum (ISF)",
    role: "Member",
    dates: "07/2024 – Present",
    locationOrMode: "VIT-AP University",
    type: "organization",
    bullets: [
      "Active member of the Institution of Electronics and Telecommunication Engineers (IETE) Student's Forum at VIT-AP, participating in hands-on technical workshops and engineering seminars on electronics, embedded hardware, and communication systems.",
    ],
    techTags: [
      "IETE",
      "Embedded Hardware",
      "Communication Systems",
      "Technical Workshops",
    ],
  },
];

export const EDUCATION_DATA: EducationData = {
  institution: "VIT-AP University",
  location: "Amaravati, Andhra Pradesh, India",
  degree: "B.Tech in Electronics and Communication Engineering (Ongoing)",
  duration: "2023 – 2027",
  expectedGraduation: "May 2027",
  cgpa: "8.49 / 10",
  coursework: [
    "Embedded Systems",
    "Microprocessors and Microcontrollers",
    "Signals and Systems",
    "Communication Systems",
    "Control Systems",
    "Linear Integrated Circuits",
    "Applied Electromagnetics",
  ],
  certifications: [
    {
      title: "Microcontroller Embedded C Programming",
      issuer: "Udemy",
      focus:
        "Bare-metal C constructs, bitwise register manipulation, memory-mapped I/O, and microcontroller peripheral programming.",
    },
  ],
};
