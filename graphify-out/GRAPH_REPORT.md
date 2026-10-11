# Graph Report - EcoSort  (2026-10-11)

## Corpus Check
- 123 files · ~658,757 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 3, .example 1, .pkg 1)

## Summary
- 591 nodes · 1164 edges · 44 communities (20 shown, 24 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 39 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c5e9dae4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- game.ts
- progress.js
- package.json
- AudioService
- compilerOptions
- Level 1: Waste Detective — Implementation Plan
- GLTFBuilder
- ECC Skills Integration
- createItemMesh.ts
- WorldCanvas.tsx
- react
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
- MapItemGalleryModal.tsx
- MissionResultsModal.tsx
- BinType
- WorldPage.tsx
- items.ts
- locomotion.test.ts

## God Nodes (most connected - your core abstractions)
1. `three` - 42 edges
2. `createItemMesh()` - 31 edges
3. `react` - 25 edges
4. `WorldPage()` - 24 edges
5. `WorldCanvas()` - 22 edges
6. `lucide-react` - 20 edges
7. `AudioService` - 20 edges
8. `ItemMeshOptions` - 20 edges
9. `BinType` - 19 edges
10. `ItemData` - 19 edges

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

## Communities (44 total, 24 thin omitted)

### Community 0 - "game.ts"
Cohesion: 0.17
Nodes (11): AVATARS, AvatarSelectModalProps, LevelSelectModalProps, ALL_BINS, GAME_LEVELS, apiService, SaveProgressPayload, BinInfo (+3 more)

### Community 1 - "progress.js"
Cohesion: 0.07
Nodes (24): bedrock, { BedrockRuntimeClient, InvokeModelCommand }, corsHeaders, client, corsHeaders, ddbDocClient, { DynamoDBClient }, { DynamoDBDocumentClient, PutCommand, QueryCommand } (+16 more)

### Community 2 - "package.json"
Cohesion: 0.04
Nodes (43): dependencies, canvas-confetti, lucide-react, react, react-dom, three, devDependencies, autoprefixer (+35 more)

### Community 3 - "AudioService"
Cohesion: 0.06
Nodes (26): 1.1 Add `residual` bin type, 1.2 Create Society Scene, 1.3 Litter Scatter System, 1.4 Pick-up Mechanic, 1.5 Update Level 1 Config, 2.1 Countdown Timer, 2.2 Garbage Truck Animation, 2.3 Wrong-Bin Feedback Enhancement (+18 more)

### Community 4 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleResolution, noEmit (+9 more)

### Community 5 - "Level 1: Waste Detective — Implementation Plan"
Cohesion: 0.11
Nodes (17): 1. Current State Analysis, 2.1 Scene Strategy, 2.2 Bin Mapping for Level 1: Waste Detective, 2.3 Game Flow State Machine, 2. Architecture Decisions, 4. File Change Summary, 5. Implementation Order, 6. Technical Notes (+9 more)

### Community 7 - "ECC Skills Integration"
Cohesion: 0.18
Nodes (10): AI Regression Testing Skill, Architecture Skill, Bento Design System, Click-Path Audit Skill, Fiction Design System, Frontend Design Skill, Lingo Design System, TDD Workflow Skill (+2 more)

### Community 8 - "createItemMesh.ts"
Cohesion: 0.11
Nodes (32): three, disposeObject3D(), createItemMesh(), createBananaPeel3D(), createBattery3D(), createBreadSlice3D(), createBrokenPen3D(), createCardboardBox3D() (+24 more)

### Community 9 - "WorldCanvas.tsx"
Cohesion: 0.06
Nodes (40): vitest, disposeItemMesh(), LEVEL_STATIONS, createLitterScatter(), dispose(), placeItem(), LitterScatterSystem, ScatteredItem (+32 more)

### Community 10 - "react"
Cohesion: 0.19
Nodes (11): canvas-confetti, lucide-react, react, EcopediaModalProps, EnergyMeterHUDProps, LevelEndModal(), LevelEndModalProps, MascotDialogueProps (+3 more)

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
Cohesion: 0.16
Nodes (5): DEFAULT_MAP_ITEM_PLACEMENTS, MapItemInstance, MapItemManager, MapItemManagerOptions, MapItemConfig

### Community 36 - "PART B — Visual system"
Cohesion: 0.06
Nodes (34): A1. Intake, A2. Page structure, A3. Layout selection, A4. Conversion rules, A5. Copywriting, A6. Build order, A7. SEO and AEO, A8. Pitfalls (+26 more)

### Community 37 - "App.tsx"
Cohesion: 0.16
Nodes (13): react-dom, App(), RouteFallback(), TeacherDashboard, WorldPage, HERO_ADVENTURES, HeroAdventure, LandingPage() (+5 more)

### Community 38 - "MapItemGalleryModal.tsx"
Cohesion: 0.33
Nodes (7): MapItemCard(), MapItemCardProps, MapItemGalleryModal(), MapItemGalleryModalProps, MapItemPreview(), MapItemPreviewProps, MapItemModelType

### Community 39 - "MissionResultsModal.tsx"
Cohesion: 0.32
Nodes (7): getRating(), MissionResultsModal(), MissionResultsModalProps, Rating, RATING_CONFIG, StatCard(), StatCardProps

### Community 40 - "BinType"
Cohesion: 0.35
Nodes (5): MissionError, WorldCanvasProps, AdaptiveSpawner, BinType, ItemData

### Community 41 - "WorldPage.tsx"
Cohesion: 0.11
Nodes (24): CleanlinessMeter(), CleanlinessMeterProps, CountdownTimer(), CountdownTimerProps, EcoLensButton(), EcoLensButtonProps, EcoLensOverlay(), EcoLensOverlayProps (+16 more)

## Knowledge Gaps
- **213 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+208 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 282 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **24 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `three` connect `createItemMesh.ts` to `WorldCanvas.tsx`, `package.json`, `MapItemInstance`, `MapItemGalleryModal.tsx`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `WorldCanvas()` (e.g. with `.dispose()` and `.getNearestItem()`) actually correct?**
  _`WorldCanvas()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _213 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `progress.js` be split into smaller, more focused modules?**
  _Cohesion score 0.06653225806451613 - nodes in this community are weakly interconnected._
- **Why does `BinType` connect `BinType` to `game.ts`, `AudioService`, `Level 1: Waste Detective — Implementation Plan`, `MissionResultsModal.tsx`, `WorldCanvas.tsx`, `WorldPage.tsx`?**
  _High betweenness centrality (0.061) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.043478260869565216 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `game.ts`, `package.json`, `App.tsx`, `MapItemGalleryModal.tsx`, `MissionResultsModal.tsx`, `WorldPage.tsx`, `WorldCanvas.tsx`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._