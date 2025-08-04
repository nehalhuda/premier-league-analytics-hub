module.exports = {

"[project]/.next-internal/server/app/api/score-prediction/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/lib/scorePredictor.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "PREMIER_LEAGUE_TEAMS": (()=>PREMIER_LEAGUE_TEAMS),
    "predictMatchScore": (()=>predictMatchScore)
});
async function predictMatchScore(homeTeam, awayTeam) {
    try {
        // In a real implementation, this would fetch from Football-Data.org API
        // For now, we'll use mock data with realistic calculations
        const homeStats = await getTeamStats(homeTeam);
        const awayStats = await getTeamStats(awayTeam);
        // Calculate attacking and defensive strength
        const homeAttackStrength = homeStats.goals_for / (homeStats.wins + homeStats.draws + homeStats.losses);
        const homeDefenseStrength = homeStats.goals_against / (homeStats.wins + homeStats.draws + homeStats.losses);
        const awayAttackStrength = awayStats.goals_for / (awayStats.wins + awayStats.draws + awayStats.losses);
        const awayDefenseStrength = awayStats.goals_against / (awayStats.wins + awayStats.draws + awayStats.losses);
        // Home advantage factor
        const homeAdvantage = 0.3;
        // Form factor (recent 5 games)
        const homeFormFactor = calculateFormFactor(homeStats.form);
        const awayFormFactor = calculateFormFactor(awayStats.form);
        // Predicted goals
        const predictedHomeGoals = Math.max(0, homeAttackStrength * (1 + homeAdvantage) * homeFormFactor - awayDefenseStrength * awayFormFactor);
        const predictedAwayGoals = Math.max(0, awayAttackStrength * awayFormFactor - homeDefenseStrength * (1 + homeAdvantage) * homeFormFactor);
        // Round to realistic scores
        const homeScore = Math.round(Math.max(0, Math.min(5, predictedHomeGoals)));
        const awayScore = Math.round(Math.max(0, Math.min(5, predictedAwayGoals)));
        // Calculate win probabilities
        const winProbability = calculateWinProbabilities(homeScore, awayScore);
        // Calculate confidence based on form and stats consistency
        const confidence = Math.min(95, Math.max(60, 75 + (homeFormFactor + awayFormFactor) * 10));
        return {
            homeTeam,
            awayTeam,
            predictedHomeScore: homeScore,
            predictedAwayScore: awayScore,
            confidence: Math.round(confidence),
            winProbability
        };
    } catch (error) {
        console.error('Error predicting match score:', error);
        throw new Error('Failed to predict match score');
    }
}
async function getTeamStats(teamName) {
    // Mock data - in real implementation, this would call Football-Data.org API
    const mockTeamStats = {
        'Manchester City': {
            name: 'Manchester City',
            goals_for: 45,
            goals_against: 18,
            wins: 14,
            draws: 3,
            losses: 2,
            form: [
                'W',
                'W',
                'W',
                'D',
                'W'
            ]
        },
        'Arsenal': {
            name: 'Arsenal',
            goals_for: 42,
            goals_against: 22,
            wins: 12,
            draws: 4,
            losses: 3,
            form: [
                'W',
                'L',
                'W',
                'W',
                'D'
            ]
        },
        'Liverpool': {
            name: 'Liverpool',
            goals_for: 48,
            goals_against: 25,
            wins: 13,
            draws: 3,
            losses: 3,
            form: [
                'W',
                'W',
                'D',
                'W',
                'W'
            ]
        },
        'Chelsea': {
            name: 'Chelsea',
            goals_for: 35,
            goals_against: 28,
            wins: 10,
            draws: 5,
            losses: 4,
            form: [
                'D',
                'W',
                'L',
                'W',
                'D'
            ]
        },
        'Manchester United': {
            name: 'Manchester United',
            goals_for: 32,
            goals_against: 30,
            wins: 9,
            draws: 6,
            losses: 4,
            form: [
                'L',
                'D',
                'W',
                'D',
                'L'
            ]
        },
        'Tottenham': {
            name: 'Tottenham',
            goals_for: 38,
            goals_against: 32,
            wins: 10,
            draws: 4,
            losses: 5,
            form: [
                'W',
                'L',
                'W',
                'W',
                'L'
            ]
        }
    };
    return mockTeamStats[teamName] || {
        name: teamName,
        goals_for: 25,
        goals_against: 35,
        wins: 6,
        draws: 5,
        losses: 8,
        form: [
            'L',
            'D',
            'L',
            'W',
            'D'
        ]
    };
}
function calculateFormFactor(form) {
    const weights = [
        0.4,
        0.3,
        0.2,
        0.1,
        0.05
    ]; // Recent games have more weight
    let formScore = 0;
    form.slice(0, 5).forEach((result, index)=>{
        const weight = weights[index] || 0.05;
        switch(result){
            case 'W':
                formScore += 3 * weight;
                break;
            case 'D':
                formScore += 1 * weight;
                break;
            case 'L':
                formScore += 0 * weight;
                break;
        }
    });
    return Math.max(0.5, Math.min(1.5, formScore / 3)); // Normalize between 0.5 and 1.5
}
function calculateWinProbabilities(homeScore, awayScore) {
    let home = 0, draw = 0, away = 0;
    if (homeScore > awayScore) {
        home = 60 + (homeScore - awayScore) * 10;
        draw = 25;
        away = 15 - (homeScore - awayScore) * 5;
    } else if (awayScore > homeScore) {
        away = 60 + (awayScore - homeScore) * 10;
        draw = 25;
        home = 15 - (awayScore - homeScore) * 5;
    } else {
        draw = 40;
        home = 30;
        away = 30;
    }
    // Ensure probabilities are within realistic bounds and sum to 100
    home = Math.max(5, Math.min(80, home));
    away = Math.max(5, Math.min(80, away));
    draw = Math.max(10, Math.min(50, draw));
    const total = home + draw + away;
    return {
        home: Math.round(home / total * 100),
        draw: Math.round(draw / total * 100),
        away: Math.round(away / total * 100)
    };
}
const PREMIER_LEAGUE_TEAMS = [
    'Manchester City',
    'Arsenal',
    'Liverpool',
    'Chelsea',
    'Manchester United',
    'Tottenham',
    'Newcastle United',
    'Brighton',
    'West Ham',
    'Aston Villa',
    'Crystal Palace',
    'Fulham',
    'Brentford',
    'Wolves',
    'Everton',
    'Nottingham Forest',
    'Burnley',
    'Sheffield United',
    'Luton Town',
    'Bournemouth'
];
}}),
"[project]/src/app/api/score-prediction/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET),
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$scorePredictor$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/scorePredictor.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-route] (ecmascript) <export * as z>");
;
;
;
const PredictionRequestSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    homeTeam: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'Home team is required'),
    awayTeam: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, 'Away team is required')
});
async function POST(request) {
    try {
        const body = await request.json();
        // Validate request body
        const validatedData = PredictionRequestSchema.parse(body);
        const { homeTeam, awayTeam } = validatedData;
        // Check if teams are different
        if (homeTeam === awayTeam) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Home team and away team must be different'
            }, {
                status: 400
            });
        }
        // Get prediction
        const prediction = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$scorePredictor$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["predictMatchScore"])(homeTeam, awayTeam);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: prediction,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Score prediction API error:', error);
        if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].ZodError) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Invalid request data',
                details: error.errors.map((err)=>({
                        field: err.path.join('.'),
                        message: err.message
                    }))
            }, {
                status: 400
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to predict match score. Please try again.'
        }, {
            status: 500
        });
    }
}
async function GET() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        message: 'Score Prediction API',
        usage: 'POST /api/score-prediction with { homeTeam: string, awayTeam: string }',
        example: {
            homeTeam: 'Manchester City',
            awayTeam: 'Arsenal'
        }
    });
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__0b3c1948._.js.map