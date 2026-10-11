# Graph Report - EcoSort  (2026-10-11)

## Corpus Check
- 123 files · ~1,185,485 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: (none) 3, .example 1, .webmanifest 1)

## Summary
- 600 nodes · 1198 edges · 49 communities (26 shown, 23 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 39 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ca44b8bd`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- BinType
- progress.js
- package.json
- Level 1: Waste Detective — Implementation Plan
- compilerOptions
- AudioService
- GLTFBuilder
- ECC Skills Integration
- createItemMesh.ts
- societyScene.ts
- WorldCanvas.tsx
- compilerOptions
- EcoSort Heroes Full Plan
- Architecture Decision Records Skill
- Clean Design System
- ECC Guide Skill
- Amplify Build Configuration
- Bento Design System
- Code Review Skill
- Debug Skill
- Fiction Design System
- Lingo Design System
- System Design Skill
- Testing Strategy Skill
- EcoSort Heroes
- PART B — Visual system
- MapItemInstance
- PART B — Visual system
- App.tsx
- vitest
- homeKitchenScene.ts
- createLitterScatter
- WorldPage.tsx
- react
- game.ts
- bins.ts
- world/types.ts
- LandingPage.tsx
- MissionResultsModal.tsx
- items.ts

## God Nodes (most connected - your core abstractions)
1. `three` - 44 edges
2. `createItemMesh()` - 33 edges
3. `react` - 26 edges
4. `WorldPage()` - 26 edges
5. `BinType` - 23 edges
6. `WorldCanvas()` - 21 edges
7. `ItemData` - 21 edges
8. `lucide-react` - 20 edges
9. `ItemMeshOptions` - 20 edges
10. `AudioService` - 20 edges

## Surprising Connections (you probably didn't know these)
- `1.3 Litter Scatter System` --references--> `createItemMesh()`  [INFERRED]
  LEVEL1_WASTE_DETECTIVE_PLAN.md → src/components/world/items/createItemMesh.ts
- `2.2 Bin Mapping for Level 1: Waste Detective` --references--> `BinType`  [INFERRED]
  LEVEL1_WASTE_DETECTIVE_PLAN.md → src/types/game.ts
- `1.1 Add `residual` bin type` --references--> `BinType`  [INFERRED]
  LEVEL1_WASTE_DETECTIVE_PLAN.md → src/types/game.ts
- `ECC Skills Integration` --references--> `Architecture Skill`  [EXTRACTED]
  AGENTS.md → .agents/skills/architecture/SKILL.md
- `ECC Skills Integration` --references--> `Click-Path Audit Skill`  [EXTRACTED]
  AGENTS.md → .agents/skills/click-path-audit/SKILL.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Visual Design & Aesthetics** — agents_skills_frontend_design, agents_skills_fiction, agents_skills_lingo, agents_skills_bento [EXTRACTED 0.90]
- **Quality Assurance & Verification Flow** — agents_skills_tdd_workflow, agents_skills_verification_loop, agents_skills_ai_regression_testing, agents_skills_click_path_audit [INFERRED 0.85]

## Communities (49 total, 23 thin omitted)

### Community 0 - "BinType"
Cohesion: 0.16
Nodes (13): 1.1 Add `residual` bin type, 1.2 Create Society Scene, 1.3 Litter Scatter System, 1.4 Pick-up Mechanic, 1.5 Update Level 1 Config, Phase 1 — Scene and Core Sort (Days 1–2) `P0`, LevelEndModalProps, ThreeSceneProps (+5 more)

### Community 1 - "progress.js"
Cohesion: 0.07
Nodes (24): bedrock, { BedrockRuntimeClient, InvokeModelCommand }, corsHeaders, client, corsHeaders, ddbDocClient, { DynamoDBClient }, { DynamoDBDocumentClient, PutCommand, QueryCommand } (+16 more)

### Community 2 - "package.json"
Cohesion: 0.04
Nodes (46): dependencies, cannon-es, canvas-confetti, lucide-react, react, react-dom, three, devDependencies (+38 more)

### Community 3 - "Level 1: Waste Detective — Implementation Plan"
Cohesion: 0.11
Nodes (17): 1. Current State Analysis, 2.1 Scene Strategy, 2.2 Bin Mapping for Level 1: Waste Detective, 2.3 Game Flow State Machine, 2. Architecture Decisions, 4. File Change Summary, 5. Implementation Order, 6. Technical Notes (+9 more)

### Community 4 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleResolution, noEmit (+9 more)

### Community 5 - "AudioService"
Cohesion: 0.07
Nodes (20): 2.1 Countdown Timer, 2.2 Garbage Truck Animation, 2.3 Wrong-Bin Feedback Enhancement, 3.1 Eco Lens System, 3.2 Eco Lens Visual Effect, 3.3 Eco Lens HUD Button, 3. Implementation Phases, 4.1 Mission Results Screen (+12 more)

### Community 7 - "ECC Skills Integration"
Cohesion: 0.18
Nodes (10): AI Regression Testing Skill, Architecture Skill, Bento Design System, Click-Path Audit Skill, Fiction Design System, Frontend Design Skill, Lingo Design System, TDD Workflow Skill (+2 more)

### Community 8 - "createItemMesh.ts"
Cohesion: 0.11
Nodes (34): three, ThreeScene(), MapItemPreview(), MapItemPreviewProps, createItemMesh(), disposeItemMesh(), createBananaPeel3D(), createBattery3D() (+26 more)

### Community 9 - "societyScene.ts"
Cohesion: 0.20
Nodes (9): BIN_COLORS, createSocietyScene(), makeBinIconTexture(), makeConcreteTex(), makeWallTex(), SocietySceneResult, TIP_LABELS, PinnedLitterSpot (+1 more)

### Community 10 - "WorldCanvas.tsx"
Cohesion: 0.23
Nodes (13): createLocomotionEngine(), isTypingTarget(), LocomotionEngine, createPlayerCharacter(), PlayerCharacter, createProceduralCity(), createThirdPersonCamera(), pinchPitchDelta() (+5 more)

### Community 11 - "compilerOptions"
Cohesion: 0.25
Nodes (7): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, skipLibCheck, include

### Community 12 - "EcoSort Heroes Full Plan"
Cohesion: 0.67
Nodes (3): ASD-STE100 Rules, EcoSort Heroes Full Plan, SAM Infrastructure Template

### Community 34 - "PART B — Visual system"
Cohesion: 0.06
Nodes (34): A1. Intake, A2. Page structure, A3. Layout selection, A4. Conversion rules, A5. Copywriting, A6. Build order, A7. SEO and AEO, A8. Pitfalls (+26 more)

### Community 35 - "MapItemInstance"
Cohesion: 0.15
Nodes (6): DEFAULT_MAP_ITEM_PLACEMENTS, MapItemInstance, MapItemManager, MapItemManagerOptions, MapItemConfig, MapItemState

### Community 36 - "PART B — Visual system"
Cohesion: 0.06
Nodes (34): A1. Intake, A2. Page structure, A3. Layout selection, A4. Conversion rules, A5. Copywriting, A6. Build order, A7. SEO and AEO, A8. Pitfalls (+26 more)

### Community 37 - "App.tsx"
Cohesion: 0.27
Nodes (7): react-dom, App(), LandingPage(), NAV_LINKS, Navbar(), NavbarProps, TeacherDashboard()

### Community 38 - "vitest"
Cohesion: 0.24
Nodes (4): vitest, calculateCameraPitchForDistance(), clampCameraDistance(), resolveBoxCollision()

### Community 39 - "homeKitchenScene.ts"
Cohesion: 0.42
Nodes (8): createBacksplashTexture(), createBinIconTexture(), createBinLabelTexture(), createCheckeredTexture(), createFridgeDoorTexture(), createHomeKitchenScene(), createParquetFloorTexture(), createWindowBackdropTexture()

### Community 40 - "createLitterScatter"
Cohesion: 0.12
Nodes (7): createLitterScatter(), dispose(), placeItem(), LitterScatterSystem, ScatteredItem, shuffle(), BOUNDS

### Community 41 - "WorldPage.tsx"
Cohesion: 0.14
Nodes (22): CleanlinessMeter(), CountdownTimer(), EcoLensButton(), EcoLensOverlay(), EcopediaModal(), EcoSortGame(), EcoSortGameProps, LevelEndModal() (+14 more)

### Community 42 - "react"
Cohesion: 0.19
Nodes (10): lucide-react, react, CleanlinessMeterProps, CountdownTimerProps, EcopediaModalProps, EnergyMeterHUDProps, MascotDialogueProps, QuizModalProps (+2 more)

### Community 43 - "game.ts"
Cohesion: 0.24
Nodes (8): AVATARS, AvatarSelectModalProps, apiService, SaveProgressPayload, BinInfo, LevelConfig, PlayerProfile, TeacherReportStats

### Community 44 - "bins.ts"
Cohesion: 0.33
Nodes (7): EcoLensButtonProps, EcoLensOverlayProps, MapItemCard(), MapItemGalleryModal(), MapItemGalleryModalProps, ALL_BINS, EcoLensState

### Community 45 - "world/types.ts"
Cohesion: 0.27
Nodes (8): HomeKitchenSceneResult, LEVEL_STATIONS, ProceduralCityResult, CameraOrbitState, LevelStation, LocomotionState, WorldMode, WorldObstacle

### Community 46 - "LandingPage.tsx"
Cohesion: 0.28
Nodes (6): LevelSelectModalProps, HERO_ADVENTURES, HeroAdventure, LandingPageProps, TAGLINE_WORDS, GAME_LEVELS

### Community 47 - "MissionResultsModal.tsx"
Cohesion: 0.28
Nodes (8): getRating(), MissionError, MissionResultsModal(), MissionResultsModalProps, Rating, RATING_CONFIG, StatCard(), StatCardProps

## Knowledge Gaps
- **215 isolated node(s):** `{ BedrockRuntimeClient, InvokeModelCommand }`, `bedrock`, `corsHeaders`, `{ DynamoDBClient }`, `{ DynamoDBDocumentClient, PutCommand, QueryCommand }` (+210 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 281 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **23 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `three` connect `createItemMesh.ts` to `package.json`, `MapItemInstance`, `vitest`, `homeKitchenScene.ts`, `createLitterScatter`, `societyScene.ts`, `WorldCanvas.tsx`, `world/types.ts`?**
  _High betweenness centrality (0.077) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `BinType` (e.g. with `1.1 Add `residual` bin type` and `2.2 Bin Mapping for Level 1: Waste Detective`) actually correct?**
  _`BinType` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `{ BedrockRuntimeClient, InvokeModelCommand }`, `bedrock`, `corsHeaders` to the rest of the system?**
  _215 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `progress.js` be split into smaller, more focused modules?**
  _Cohesion score 0.06653225806451613 - nodes in this community are weakly interconnected._
- **Why does `BinType` connect `BinType` to `Level 1: Waste Detective — Implementation Plan`, `homeKitchenScene.ts`, `createItemMesh.ts`, `societyScene.ts`, `WorldCanvas.tsx`, `WorldPage.tsx`, `bins.ts`, `world/types.ts`, `game.ts`, `MissionResultsModal.tsx`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.041666666666666664 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `package.json`, `App.tsx`, `createItemMesh.ts`, `WorldPage.tsx`, `WorldCanvas.tsx`, `game.ts`, `bins.ts`, `LandingPage.tsx`, `MissionResultsModal.tsx`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._