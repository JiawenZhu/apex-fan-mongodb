import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  Easing,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const fps = 30;

type Accent = "emerald" | "blue" | "gold" | "violet";
type Action = "hook" | "chat" | "trace" | "status" | "atlas" | "geo" | "memory" | "verify";

type SceneSpec = {
  title: string;
  eyebrow: string;
  duration: number;
  screenshot: string;
  secondaryScreenshot?: string;
  caption: string;
  bullets: string[];
  metric: string;
  accent: Accent;
  action: Action;
};

export const scenes: SceneSpec[] = [
  {
    title: "Matchday gets messy fast",
    eyebrow: "World Cup 2026 hook",
    duration: 21,
    screenshot: "screenshots/frontend/01-home-dashboard.png",
    caption:
      "ApexFan turns the chaotic after-match question into one guided group plan: where to go, what fits the budget, and why the agent recommends it.",
    bullets: ["Six friends", "One stadium", "Food, retail, budget, votes", "Evidence behind every answer"],
    metric: "From group chaos to an inspectable plan",
    accent: "emerald",
    action: "hook",
  },
  {
    title: "Ask the app like a fan",
    eyebrow: "Live product action",
    duration: 18,
    screenshot: "screenshots/frontend/01-home-dashboard.png",
    caption:
      "The demo starts with a real user action: type a venue question, send it, and watch ApexFan move from chat into MongoDB-grounded planning.",
    bullets: ["Type a SoFi group question", "Send to Gemini", "Retrieve venue context"],
    metric: "One prompt starts the workflow",
    accent: "blue",
    action: "chat",
  },
  {
    title: "Open the evidence trail",
    eyebrow: "Read-only retrieval trace",
    duration: 17,
    screenshot: "screenshots/frontend/02-chat-retrieval-evidence.png",
    caption:
      "The answer is not just text. ApexFan shows which collections were read, which operations ran, and which documents grounded the response.",
    bullets: ["fan_profiles.findOne", "stadiums.find", "malls.find", "itineraries.aggregate"],
    metric: "No black-box recommendation",
    accent: "emerald",
    action: "trace",
  },
  {
    title: "Run user status checks",
    eyebrow: "Verification sweep",
    duration: 16,
    screenshot: "screenshots/frontend/03-user-status-checks.png",
    secondaryScreenshot: "screenshots/frontend/04-playbook-retrieval-trace.png",
    caption:
      "Reviewers can see the system checking MongoDB connection, geospatial indexes, retrieval traces, Gemini mode, trust checks, and fan memory.",
    bullets: ["/api/status", "/api/live-mongodb", "/api/retrieval-trace", "/api/trust-check"],
    metric: "Claims become checks",
    accent: "violet",
    action: "status",
  },
  {
    title: "Prove the Atlas backend",
    eyebrow: "MongoDB Atlas evidence",
    duration: 18,
    screenshot: "screenshots/backend/03-apexfan-database-expanded.png",
    secondaryScreenshot: "screenshots/backend/01-atlas-clusters-overview.png",
    caption:
      "The backend is a real Atlas-backed data model: stadiums, malls, itineraries, fan profiles, group decisions, and agent actions.",
    bullets: ["Live Atlas cluster", "Driver-backed counts", "Persistent event memory"],
    metric: "6 core MongoDB collections",
    accent: "gold",
    action: "atlas",
  },
  {
    title: "Use location, not hard-coded text",
    eyebrow: "2dsphere geospatial action",
    duration: 16,
    screenshot: "screenshots/backend/08-malls-2dsphere-indexes.png",
    secondaryScreenshot: "screenshots/backend/04-stadiums-documents.png",
    caption:
      "MongoDB geospatial indexes connect stadiums to restaurants and retail by distance, then the UI explains surge, capacity, rating, and proximity.",
    bullets: ["2dsphere index", "Distance-ranked commerce", "Venue-aware recommendations"],
    metric: "34 nearby commerce records",
    accent: "emerald",
    action: "geo",
  },
  {
    title: "Coordinate the group",
    eyebrow: "Memory plus decisions",
    duration: 16,
    screenshot: "screenshots/frontend/05-group-decision-room.png",
    secondaryScreenshot: "screenshots/backend/05-fan-profiles-documents.png",
    caption:
      "ApexFan keeps the demo safe and practical: synthetic fan preferences personalize suggestions, while group decisions store proposals and votes.",
    bullets: ["Demo-safe profile memory", "Shared vote state", "Budget-aware planning"],
    metric: "Personalized without private data",
    accent: "violet",
    action: "memory",
  },
  {
    title: "Verify it in minutes",
    eyebrow: "Judge-ready close",
    duration: 20,
    screenshot: "screenshots/frontend/06-footer-verification.png",
    caption:
      "The reviewer path is direct: open the demo, run the guided flow, inspect retrieval evidence, and verify the same story through callable endpoints.",
    bullets: ["Hosted demo URL", "Reviewer-visible evidence", "MongoDB-centered scorecard"],
    metric: "Demo-ready, inspectable, reusable",
    accent: "blue",
    action: "verify",
  },
];

export const totalSeconds = scenes.reduce((sum, scene) => sum + scene.duration, 0);
export const totalFrames = totalSeconds * fps;

const accentColor = {
  emerald: "#19d79f",
  blue: "#57b7ff",
  gold: "#f7c948",
  violet: "#9b7cff",
} satisfies Record<Accent, string>;

const fitToFrame = {
  width: "100%",
  height: "100%",
  objectFit: "contain" as const,
};

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const ease = (frame: number, input: [number, number], output: [number, number]) =>
  interpolate(frame, input, output, {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

const enter = (frame: number, fpsValue: number) => ease(frame, [0, 0.4 * fpsValue], [0.88, 1]);

const typeText = (text: string, frame: number, start: number, end: number) => {
  const chars = Math.floor(interpolate(frame, [start, end], [0, text.length], clamp));
  return text.slice(0, chars);
};

const focusByAction = {
  hook: { start: 42, end: 132, scale: 1.22, x: -44, y: -18, cursorX: 705, cursorY: 522 },
  chat: { start: 58, end: 170, scale: 1.38, x: -78, y: -112, cursorX: 760, cursorY: 604 },
  trace: { start: 34, end: 132, scale: 1.42, x: -106, y: -82, cursorX: 690, cursorY: 436 },
  status: { start: 28, end: 118, scale: 1.32, x: -42, y: -92, cursorX: 724, cursorY: 486 },
  atlas: { start: 38, end: 140, scale: 1.25, x: -18, y: -36, cursorX: 742, cursorY: 402 },
  geo: { start: 36, end: 130, scale: 1.32, x: -82, y: -58, cursorX: 710, cursorY: 432 },
  memory: { start: 34, end: 132, scale: 1.3, x: -64, y: -86, cursorX: 752, cursorY: 518 },
  verify: { start: 44, end: 148, scale: 1.26, x: -36, y: -72, cursorX: 740, cursorY: 566 },
} satisfies Record<Action, { start: number; end: number; scale: number; x: number; y: number; cursorX: number; cursorY: number }>;

const focusProgress = (frame: number, action: Action) => {
  const focus = focusByAction[action];
  const enterFocus = ease(frame, [focus.start, focus.start + 20], [0, 1]);
  const exitFocus = ease(frame, [focus.end - 18, focus.end], [1, 0]);
  return Math.min(enterFocus, exitFocus);
};

const focusTransform = (frame: number, action: Action) => {
  const focus = focusByAction[action];
  const progress = focusProgress(frame, action);
  return {
    scale: 1 + (focus.scale - 1) * progress,
    x: focus.x * progress,
    y: focus.y * progress,
    progress,
  };
};

const Cursor = ({ x, y, color }: { x: number; y: number; color: string }) => {
  const frame = useCurrentFrame();
  const pulse = spring({ frame, fps, config: { damping: 12, stiffness: 80 } });

  return (
    <div
      className="cursor"
      style={{
        left: x,
        top: y,
        borderBottomColor: color,
        transform: `translate(-8px, -8px) scale(${0.92 + pulse * 0.08})`,
      }}
    >
      <div style={{ backgroundColor: color }} />
    </div>
  );
};

const ClickRipple = ({ x, y, color, start }: { x: number; y: number; color: string; start: number }) => {
  const frame = useCurrentFrame();
  const progress = ease(frame, [start, start + 28], [0, 1]);
  const opacity = interpolate(progress, [0, 0.18, 1], [0, 0.72, 0], clamp);

  return (
    <div
      className="click-ripple"
      style={{
        left: x,
        top: y,
        borderColor: color,
        color,
        opacity,
        transform: `translate(-50%, -50%) scale(${0.35 + progress * 2.6})`,
      }}
    />
  );
};

const FocusCursor = ({ action, color }: { action: Action; color: string }) => {
  const frame = useCurrentFrame();
  const focus = focusByAction[action];
  const progress = focusProgress(frame, action);
  const restX = focus.cursorX - 95;
  const restY = focus.cursorY + 70;
  const x = interpolate(progress, [0, 1], [restX, focus.cursorX], clamp);
  const y = interpolate(progress, [0, 1], [restY, focus.cursorY], clamp);

  return (
    <>
      <ClickRipple x={focus.cursorX} y={focus.cursorY} color={color} start={focus.start + 18} />
      <Cursor x={x} y={y} color={color} />
    </>
  );
};

const FloatingCard = ({
  label,
  value,
  color,
  delay,
  x,
  y,
}: {
  label: string;
  value: string;
  color: string;
  delay: number;
  x: number;
  y: number;
}) => {
  const frame = useCurrentFrame();
  const opacity = ease(frame, [delay, delay + 18], [0, 1]);

  return (
    <div
      className="floating-card"
      style={{
        left: x,
        top: y,
        borderColor: `${color}70`,
        opacity,
        transform: `translateY(${interpolate(opacity, [0, 1], [18, 0])}px)`,
      }}
    >
      <span style={{ color }}>{label}</span>
      <strong>{value}</strong>
    </div>
  );
};

const ActionOverlay = ({ scene, color }: { scene: SceneSpec; color: string }) => {
  const frame = useCurrentFrame();
  const config = useVideoConfig();

  if (scene.action === "hook") {
    const route = ease(frame, [18, 90], [0, 1]);
    return (
      <div className="action-layer">
        <div className="mini-map">
          <div className="stadium-pin" style={{ backgroundColor: color }}>SoFi</div>
          <div className="route-line" style={{ width: `${route * 360}px`, backgroundColor: color }} />
          <div className="commerce-pin food">Dinner</div>
          <div className="commerce-pin mall">Mall</div>
          <div className="group-bubble bubble-one">6 fans</div>
          <div className="group-bubble bubble-two">$180 budget</div>
          <div className="group-bubble bubble-three">2 votes split</div>
        </div>
        <FloatingCard label="Problem" value="Where do we go after the match?" color={color} delay={42} x={44} y={420} />
        <FocusCursor action={scene.action} color={color} />
      </div>
    );
  }

  if (scene.action === "chat") {
    const prompt = "What should our group do near SoFi after the match?";
    const typed = typeText(prompt, frame, 24, 132);
    const cursorX = interpolate(frame, [0, 90, 150, 210], [650, 720, 795, 845], clamp);
    const cursorY = interpolate(frame, [0, 90, 150, 210], [520, 560, 590, 545], clamp);

    return (
      <div className="action-layer">
        <div className="typing-overlay">
          <span>Ask ApexFan</span>
          <p>{typed}<i>{frame % 24 < 12 ? "|" : ""}</i></p>
        </div>
        <button className="send-button" style={{ borderColor: color, color }}>
          Send
        </button>
        <ClickRipple x={845} y={545} color={color} start={168} />
        <Cursor x={cursorX} y={cursorY} color={color} />
        <FloatingCard label="Action" value="User asks, app retrieves" color={color} delay={150} x={58} y={600} />
      </div>
    );
  }

  if (scene.action === "trace") {
    return (
      <div className="action-layer">
        {["fan_profiles.findOne", "stadiums.find", "malls.find", "itineraries.aggregate"].map((op, index) => (
          <div
            className="trace-op"
            key={op}
            style={{
              top: 250 + index * 62,
              borderColor: `${color}80`,
              opacity: ease(frame, [28 + index * 18, 48 + index * 18], [0, 1]),
            }}
          >
            <span style={{ backgroundColor: color }} />
            {op}
          </div>
        ))}
        <div className="scan-line" style={{ top: interpolate(frame, [0, scene.duration * config.fps], [168, 642], clamp), backgroundColor: color }} />
        <FocusCursor action={scene.action} color={color} />
      </div>
    );
  }

  if (scene.action === "status") {
    const checks = ["Database", "2dsphere index", "Gemini", "Retrieval trace", "Trust check", "Fan memory"];
    return (
      <div className="action-layer status-grid">
        {checks.map((check, index) => (
          <div className="status-pill" key={check} style={{ opacity: ease(frame, [18 + index * 13, 32 + index * 13], [0, 1]) }}>
            <span style={{ backgroundColor: color }}>✓</span>
            {check}
          </div>
        ))}
        <FocusCursor action={scene.action} color={color} />
      </div>
    );
  }

  if (scene.action === "atlas") {
    return (
      <div className="action-layer atlas-cards">
        {[
          ["stadiums", "16 venue docs"],
          ["malls", "34 commerce docs"],
          ["fan_profiles", "safe memory"],
          ["agent_actions", "audit trail"],
        ].map(([label, value], index) => (
          <FloatingCard key={label} label={label} value={value} color={color} delay={20 + index * 18} x={38 + (index % 2) * 260} y={360 + Math.floor(index / 2) * 118} />
        ))}
        <FocusCursor action={scene.action} color={color} />
      </div>
    );
  }

  if (scene.action === "geo") {
    const sweep = ease(frame, [24, 120], [0, 1]);
    return (
      <div className="action-layer">
        <div className="geo-widget">
          <span className="geo-node stadium" style={{ backgroundColor: color }}>Stadium</span>
          <span className="geo-node restaurant">Food</span>
          <span className="geo-node retail">Retail</span>
          <span className="geo-node fan">Fans</span>
          <div className="geo-line geo-line-one" style={{ transform: `scaleX(${sweep})`, backgroundColor: color }} />
          <div className="geo-line geo-line-two" style={{ transform: `scaleX(${Math.max(0, sweep - 0.22) / 0.78})`, backgroundColor: color }} />
        </div>
        <FloatingCard label="MongoDB" value="2dsphere proximity query" color={color} delay={118} x={52} y={612} />
        <FocusCursor action={scene.action} color={color} />
      </div>
    );
  }

  if (scene.action === "memory") {
    return (
      <div className="action-layer memory-board">
        {["Budget-friendly", "Accessible route", "Late dinner", "Team split vote"].map((text, index) => (
          <div className="memory-note" key={text} style={{ opacity: ease(frame, [20 + index * 16, 38 + index * 16], [0, 1]) }}>
            <span style={{ color }}>{index + 1}</span>
            {text}
          </div>
        ))}
        <FocusCursor action={scene.action} color={color} />
      </div>
    );
  }

  return (
    <div className="action-layer verify-cards">
      {["/?demo=true", "/api/status", "/api/live-mongodb", "/api/retrieval-trace"].map((endpoint, index) => (
        <div className="endpoint-card" key={endpoint} style={{ opacity: ease(frame, [24 + index * 18, 42 + index * 18], [0, 1]) }}>
          <span style={{ backgroundColor: color }}>PASS</span>
          <code>{endpoint}</code>
        </div>
      ))}
      <FocusCursor action={scene.action} color={color} />
    </div>
  );
};

const Scene = ({ scene, index }: { scene: SceneSpec; index: number }) => {
  const frame = useCurrentFrame();
  const config = useVideoConfig();
  const progress = enter(frame, config.fps);
  const imageShift = interpolate(frame, [0, scene.duration * config.fps], [26, -22], clamp);
  const imageScale = interpolate(frame, [0, scene.duration * config.fps], [1.02, 1.08], clamp);
  const focus = focusTransform(frame, scene.action);
  const color = accentColor[scene.accent];

  return (
    <AbsoluteFill className={`scene scene-${scene.accent}`}>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <div className="topbar">
        <div className="brand-dot" style={{ backgroundColor: color }} />
        <span>ApexFan</span>
        <span className="divider">/</span>
        <span>Google Cloud Rapid Agent Hackathon</span>
        <span className="scene-count">
          {String(index + 1).padStart(2, "0")} / {String(scenes.length).padStart(2, "0")}
        </span>
      </div>

      <div className="layout">
        <div
          className="copy-panel"
          style={{
            opacity: progress,
            transform: `translateY(${interpolate(progress, [0, 1], [28, 0])}px)`,
          }}
        >
          <div className="eyebrow" style={{ color }}>
            {scene.eyebrow}
          </div>
          <h1>{scene.title}</h1>
          <p className="caption">{scene.caption}</p>
          <div className="metric" style={{ borderColor: `${color}66` }}>
            <span className="metric-label">Judge-visible proof</span>
            <strong>{scene.metric}</strong>
          </div>
          <div className="bullet-list">
            {scene.bullets.map((bullet, bulletIndex) => (
              <div
                className="bullet"
                key={bullet}
                style={{ opacity: ease(frame, [22 + bulletIndex * 9, 34 + bulletIndex * 9], [0, 1]) }}
              >
                <span style={{ backgroundColor: color }} />
                <p>{bullet}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          className={scene.secondaryScreenshot ? "media-stack has-secondary" : "media-stack"}
          style={{
            opacity: progress,
            transform: `translateX(${interpolate(progress, [0, 1], [42, 0])}px)`,
          }}
        >
          <div className="screen-frame primary-frame" style={{ transform: `translateY(${imageShift}px) scale(${imageScale})` }}>
            <div className="window-dots">
              <span />
              <span />
              <span />
            </div>
            <div
              className="screen-content"
              style={{
                transform: `translate(${focus.x}px, ${focus.y}px) scale(${focus.scale})`,
              }}
            >
              <Img src={staticFile(scene.screenshot)} style={fitToFrame} />
            </div>
          </div>
          {scene.secondaryScreenshot ? (
            <div className="screen-frame secondary-frame">
              <div className="window-dots">
                <span />
                <span />
                <span />
              </div>
              <Img src={staticFile(scene.secondaryScreenshot)} style={fitToFrame} />
            </div>
          ) : null}
          <ActionOverlay scene={scene} color={color} />
        </div>
      </div>

      <div className="subtitle-card">
        <span style={{ backgroundColor: color }} />
        <p>{scene.caption}</p>
      </div>
    </AbsoluteFill>
  );
};

export const MyComposition = () => {
  let cursor = 0;

  return (
    <AbsoluteFill className="video-root">
      <Audio src={staticFile("audio/gemini-31-flash-tts/combined-gemini-31-flash-tts-tight-v3.mp3")} />
      {scenes.map((scene, index) => {
        const from = cursor;
        cursor += scene.duration * fps;
        return (
          <Sequence key={scene.title} from={from} durationInFrames={scene.duration * fps}>
            <Scene scene={scene} index={index} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
