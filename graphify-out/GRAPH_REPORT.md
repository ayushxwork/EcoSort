# Graph Report - EcoSort  (2026-10-11)

## Corpus Check
- 121 files · ~1,200,014 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 3, .example 1, .glb 1)

## Summary
- 590 nodes · 1153 edges · 39 communities (15 shown, 24 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 41 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `02a9e775`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- .smoke-test.cjs
- progress.js
- package.json
- Level 1: Waste Detective — Implementation Plan
- compilerOptions
- AudioService
- GLTFBuilder
- ECC Skills Integration
- createItemMesh.ts
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
- WorldCanvas
- PART B — Visual system
- App.tsx
- createLitterScatter
- WorldPage.tsx

## God Nodes (most connected - your core abstractions)
1. `three` - 42 edges
2. `createItemMesh()` - 32 edges
3. `react` - 25 edges
4. `WorldPage()` - 24 edges
5. `BinType` - 23 edges
6. `ItemData` - 21 edges
7. `lucide-react` - 20 edges
8. `ItemMeshOptions` - 20 edges
9. `AudioService` - 20 edges
10. `WorldCanvas()` - 17 edges

## Surprising Connections (you probably didn't know these)
- `1.3 Litter Scatter System` --references--> `createItemMesh()`  [INFERRED]
  LEVEL1_WASTE_DETECTIVE_PLAN.md → src/components/world/items/createItemMesh.ts
- `1.1 Add `residual` bin type` --references--> `BinType`  [INFERRED]
  LEVEL1_WASTE_DETECTIVE_PLAN.md → src/types/game.ts
- `2.2 Bin Mapping for Level 1: Waste Detective` --references--> `BinType`  [INFERRED]
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

## Communities (39 total, 24 thin omitted)

### Community 1 - "progress.js"
Cohesion: 0.07
Nodes (24): bedrock, { BedrockRuntimeClient, InvokeModelCommand }, corsHeaders, client, corsHeaders, ddbDocClient, { DynamoDBClient }, { DynamoDBDocumentClient, PutCommand, QueryCommand } (+16 more)

### Community 2 - "package.json"
Cohesion: 0.04
Nodes (46): dependencies, cannon-es, canvas-confetti, lucide-react, react, react-dom, three, devDependencies (+38 more)

### Community 3 - "Level 1: Waste Detective — Implementation Plan"
Cohesion: 0.05
Nodes (41): 1.1 Add `residual` bin type, 1.2 Create Society Scene, 1.3 Litter Scatter System, 1.4 Pick-up Mechanic, 1.5 Update Level 1 Config, 1. Current State Analysis, 2.1 Countdown Timer, 2.1 Scene Strategy (+33 more)

### Community 4 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleResolution, noEmit (+9 more)

### Community 7 - "ECC Skills Integration"
Cohesion: 0.18
Nodes (10): AI Regression Testing Skill, Architecture Skill, Bento Design System, Click-Path Audit Skill, Fiction Design System, Frontend Design Skill, Lingo Design System, TDD Workflow Skill (+2 more)

### Community 8 - "createItemMesh.ts"
Cohesion: 0.11
Nodes (34): three, ThreeScene(), MapItemPreview(), MapItemPreviewProps, createItemMesh(), disposeItemMesh(), createBananaPeel3D(), createBattery3D() (+26 more)

### Community 9 - "WorldCanvas.tsx"
Cohesion: 0.07
Nodes (36): vitest, createBacksplashTexture(), createBinIconTexture(), createBinLabelTexture(), createCheckeredTexture(), createFridgeDoorTexture(), createHomeKitchenScene(), createParquetFloorTexture() (+28 more)

### Community 11 - "compilerOptions"
Cohesion: 0.25
Nodes (7): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, skipLibCheck, include

### Community 12 - "EcoSort Heroes Full Plan"
Cohesion: 0.67
Nodes (3): ASD-STE100 Rules, EcoSort Heroes Full Plan, SAM Infrastructure Template

### Community 34 - "PART B — Visual system"
Cohesion: 0.06
Nodes (34): A1. Intake, A2. Page structure, A3. Layout selection, A4. Conversion rules, A5. Copywriting, A6. Build order, A7. SEO and AEO, A8. Pitfalls (+26 more)

### Community 35 - "WorldCanvas"
Cohesion: 0.15
Nodes (7): DEFAULT_MAP_ITEM_PLACEMENTS, MapItemInstance, MapItemManager, MapItemManagerOptions, MapItemConfig, MapItemState, WorldCanvas()

### Community 36 - "PART B — Visual system"
Cohesion: 0.06
Nodes (34): A1. Intake, A2. Page structure, A3. Layout selection, A4. Conversion rules, A5. Copywriting, A6. Build order, A7. SEO and AEO, A8. Pitfalls (+26 more)

### Community 37 - "App.tsx"
Cohesion: 0.17
Nodes (11): react-dom, App(), HERO_ADVENTURES, HeroAdventure, LandingPage(), LandingPageProps, TAGLINE_WORDS, NAV_LINKS (+3 more)

### Community 40 - "createLitterScatter"
Cohesion: 0.15
Nodes (5): createLitterScatter(), dispose(), LitterScatterSystem, ScatteredItem, shuffle()

### Community 41 - "WorldPage.tsx"
Cohesion: 0.05
Nodes (64): lucide-react, react, AVATARS, AvatarSelectModalProps, CleanlinessMeter(), CleanlinessMeterProps, CountdownTimer(), CountdownTimerProps (+56 more)

## Knowledge Gaps
- **213 isolated node(s):** `{ chromium }`, `{ BedrockRuntimeClient, InvokeModelCommand }`, `bedrock`, `corsHeaders`, `{ DynamoDBClient }` (+208 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 277 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **24 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `three` connect `createItemMesh.ts` to `package.json`, `WorldCanvas`, `createLitterScatter`, `WorldPage.tsx`, `WorldCanvas.tsx`?**
  _High betweenness centrality (0.073) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `BinType` (e.g. with `1.1 Add `residual` bin type` and `2.2 Bin Mapping for Level 1: Waste Detective`) actually correct?**
  _`BinType` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `{ chromium }`, `{ BedrockRuntimeClient, InvokeModelCommand }`, `bedrock` to the rest of the system?**
  _213 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `progress.js` be split into smaller, more focused modules?**
  _Cohesion score 0.06653225806451613 - nodes in this community are weakly interconnected._
- **Why does `BinType` connect `WorldPage.tsx` to `WorldCanvas.tsx`, `Level 1: Waste Detective — Implementation Plan`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.041666666666666664 - nodes in this community are weakly interconnected._
- **Why does `react` connect `WorldPage.tsx` to `createItemMesh.ts`, `WorldCanvas.tsx`, `package.json`, `App.tsx`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._